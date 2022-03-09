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
  GET_MACHINE,
  GET_MACHINE_ERROR,
  GET_MACHINE_SUCCESS,
} from "../types";

// cada reducer tiene su propio state
const initialState = {
  machines: [],
  error: null,
  loading: false,
  machineToDelete: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GET_MACHINES:
    case ADD_MACHINE:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_MACHINE_SUCCESS:
      return {
        ...state,
        loading: false,
        machines: [...state.machines, action.payload],
      };
    case GET_MACHINES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        machines: action.payload,
      };
    case GET_MACHINE_TO_DELETE:
      return {
        ...state,
        machineToDelete: action.payload,
      };
    case MACHINE_DELETE_SUCCESS:
      return {
        ...state,
        machines: state.machines.filter(
          (machine) => machine.id !== state.machineToDelete
        ),
        machineToDelete: null,
      };
    case GET_MACHINE:
      return {
        ...state,
        loading: true,
      };
    case GET_MACHINE_SUCCESS:
      return {
        ...state,
        machine: action.payload,
      };
    case ADD_MACHINE_ERROR:
    case GET_MACHINES_ERROR:
    case MACHINE_DELETE_ERROR:
    case GET_MACHINE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
