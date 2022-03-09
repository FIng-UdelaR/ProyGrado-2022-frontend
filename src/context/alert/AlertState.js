import { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";
import { HIDE_ALERT, SHOW_ALERT } from "../types";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // hide alert
  const hideAlert = () => {
    dispatch({ type: HIDE_ALERT });
  };
  //show alert
  const createAlert = (alert) => {
    dispatch({ type: SHOW_ALERT, payload: alert });
  };

  return (
    <AlertContext.Provider
      value={{
        ...state,
        hideAlert,
        createAlert,
        alert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
