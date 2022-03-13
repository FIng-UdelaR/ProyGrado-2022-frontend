import { useReducer } from "react";
import WorkFlowContext from "./WorkFlowContext";
import WorkFlowReducer from "./WorkFlowReducer";
import {
  ADD_WORK_FLOW,
  ADD_WORK_FLOW_SUCCESS,
  ADD_WORK_FLOW_ERROR,
  START_GET_WORK_FLOWS,
  GET_WORK_FLOWS_SUCCESS,
  GET_WORK_FLOWS_ERROR,
} from "../types";
import clientAxios from "../../config/axios";
import Swal from "sweetalert2";
import { PropsList } from "../../utils/enum";
import { useNavigate } from "react-router-dom";

const WorkFlowState = (props) => {
  const initialState = {
    machines: [],
    error: null,
    loading: false,
    machineToDelete: null,
  };
  const [state, dispatch] = useReducer(WorkFlowReducer, initialState);
  const navigate = useNavigate();
  // Crete new workFlows
  const createNewWorkFlowAction = async (workFlow) => {
    dispatch({
      type: ADD_WORK_FLOW,
      payload: true,
    });

    try {
      // api call
      await clientAxios.post("/Work/AddCompoundWork", workFlow);

      // if success, update state
      dispatch({
        type: ADD_WORK_FLOW_SUCCESS,
        payload: workFlow,
      });

      // Alert
      Swal.fire(
        "Correcto",
        "La orden fue creada correctamente",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/orders");
        }
      });
    } catch (error) {
      console.log(error.response.data);
      // if had error
      dispatch({
        type: ADD_WORK_FLOW_ERROR,
        payload: error.response.data,
      });

      // alert error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };

  // get all machines from db
  const getWorkFlowsAction = async () => {
    dispatch({
      type: START_GET_WORK_FLOWS,
      payload: true,
    });

    try {
      const response = await clientAxios.get("/Work/GetOrders");
      dispatch({
        type: GET_WORK_FLOWS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_WORK_FLOWS_ERROR,
        payload: error.response.data,
      });
    }
  };

  return (
    <WorkFlowContext.Provider
      value={{
        ...state,
        createNewWorkFlowAction,
        getWorkFlowsAction,
      }}
    >
      {props.children}
    </WorkFlowContext.Provider>
  );
};

export default WorkFlowState;
