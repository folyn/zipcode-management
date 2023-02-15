import React, { createContext, useReducer } from "react";
import { zipCodes } from "../constant/zipCodeConstant";

import { v4 as uuidv4 } from "uuid";
import moment from "moment";
const codeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CODE":
      const newDate = moment().format("MM/DD/YYYY");
      return state.concat({
        id: uuidv4(),
        code: action.zipCode,
        method: action.shippingMethod,
        updateDate: newDate,
      });
    case "DELETE_CODE":
      const deleteState = [...state];
      const deleteCode = deleteState.filter((code) => code.id !== action.id);
      return deleteCode;
    case "UPDATE_CODE":
      const nextState = [...state];
      const updatedCode = nextState.find((code) => code.id === action.id);
      if (updatedCode) {
        updatedCode.method = action.method;
      }
      return nextState;
    default:
      return state;
  }
};

export const CodeManagementContext = createContext(null);
export const CodeManagementContextProvider = ({ children }) => {
  const [codes, dispatch] = useReducer(codeReducer, zipCodes);
  return <CodeManagementContext.Provider value={{ dispatch, codes }}>
    {children}
  </CodeManagementContext.Provider>
};
