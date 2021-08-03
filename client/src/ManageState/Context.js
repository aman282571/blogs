import React, { useReducer, createContext } from "react";
import { Reducer } from "./Reducer";
export const stateContext = createContext();
function Context(props) {
  const [state, dispatch] = useReducer(Reducer, {
    id: localStorage.getItem("id"),
    img: JSON.parse(localStorage.getItem("img")),
  });
  return (
    <stateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </stateContext.Provider>
  );
}

export default Context;
