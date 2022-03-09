import {
  ADD_WORK_FLOW,
  ADD_WORK_FLOW_SUCCESS,
  ADD_WORK_FLOW_ERROR,
  START_GET_WORK_FLOWS,
  GET_WORK_FLOWS_SUCCESS,
  GET_WORK_FLOWS_ERROR,
} from "../types";

// cada reducer tiene su propio state
const initialState = {
  error: null,
  loading: false,
  orders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GET_WORK_FLOWS:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_WORK_FLOW:
      return {
        ...state,
        loading: action.payload,
        success: false,
      };
    case ADD_WORK_FLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case GET_WORK_FLOWS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case GET_WORK_FLOWS_ERROR:
    case ADD_WORK_FLOW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
