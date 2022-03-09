import { useReducer } from "react";
import MachineReducer from "./MachineReducer";
import MachineContext from "./MachineContext";
import {
  ADD_MACHINE,
  ADD_MACHINE_SUCCESS,
  ADD_MACHINE_ERROR,
  START_GET_MACHINES,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_ERROR,
  GET_MACHINE_TO_DELETE,
  MACHINE_DELETE_SUCCESS,
  MACHINE_DELETE_ERROR,
  GET_MACHINE_SUCCESS,
  GET_MACHINE_ERROR,
} from "../types";

import clientAxios from "../../config/axios";
import Swal from "sweetalert2";
import axios from "axios";
import { PropsList } from "../../utils/enum";

const MachineState = (props) => {
  const initialState = {
    machines: [],
    error: null,
    loading: false,
    machineToDelete: null,
  };
  const [state, dispatch] = useReducer(MachineReducer, initialState);

  // Crete new machines
  const createNewMachine = async (machine) => {
    console.log("dispaching");
    dispatch({
      type: ADD_MACHINE,
      payload: true,
    });

    try {
      // api call
      const response = await clientAxios.post(
        "/Machine/CreateMachine",
        machine
      );
      // if success, update state
      dispatch({
        type: ADD_MACHINE_SUCCESS,
        payload: machine,
      });
      // Alert
      Swal.fire("Correcto", "La maquina se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      // if had error
      dispatch({
        type: ADD_MACHINE_ERROR,
        payload: error,
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
  const getMachines = async () => {
    dispatch({
      type: START_GET_MACHINES,
      payload: true,
    });
    try {
      const response = await clientAxios.get("/Machine/GetMachines");
      dispatch({
        type: GET_MACHINES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MACHINES_ERROR,
        payload: true,
      });
    }
  };

  // select and delete machine
  const deleteMachineAction = async (id) => {
    dispatch({
      type: GET_MACHINE_TO_DELETE,
      payload: id,
    });

    try {
      await clientAxios.delete(`/machines/${id}`);
      dispatch({
        type: MACHINE_DELETE_SUCCESS,
      });

      // Si se elimina, mostrar alerta
      Swal.fire("Eliminado", "El machine se eliminó correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch({
        type: MACHINE_DELETE_ERROR,
        payload: true,
      });
    }
  };

  // Get machine details
  const getMachineDetail = async (url) => {
    dispatch({
      type: START_GET_MACHINES,
      payload: true,
    });
    let machine = {};
    try {
      const axiosInstance = axios.create({
        baseURL: url,
        timeout: 30000,
      });
      // api call
      let machineDetails = await Object.values(PropsList).map(async (prop) => {
        let result = await axiosInstance.get(
          `/submodel/properties/${prop}/value`
        );
        machine = {
          [prop]: result?.data?.value,
        };
        return machine;
      });

      machine = await Promise.all(Object.values(machineDetails));
      machine = machine.reduce((obj, item) => ({ ...obj, ...item }), {});
      machine.MachineLocation = JSON.parse(machine.MachineLocation);
      machine.MachineSupportedQualities =
        machine.MachineSupportedQualities.split(",");
      machine.MachineSupportedSizes = machine.MachineSupportedSizes.split(",");

      // if success, update state
      dispatch({
        type: GET_MACHINE_SUCCESS,
        payload: machine,
      });
    } catch (error) {
      console.log(error);
      // if had error
      dispatch({
        type: GET_MACHINE_ERROR,
        payload: error,
      });

      // alert error
      Swal.fire({
        icon: "error",
        title: "There was an error",
        text: "There was an error, try again",
      });
    }
  };

  return (
    <MachineContext.Provider
      value={{
        ...state,
        createNewMachine,
        getMachines,
        deleteMachineAction,
        getMachineDetail,
      }}
    >
      {props.children}
    </MachineContext.Provider>
  );
};

export default MachineState;
