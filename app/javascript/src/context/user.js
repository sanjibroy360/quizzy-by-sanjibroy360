import React, { useContext } from "react";
import userReducer from "../reducers/user";

const UserStateContext = React.createContext(null);
const initialState = { user: null };

const UserProvider = ({ children }) => {
  console.log({userReducer, initialState})
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  return (
    <UserStateContext.Provider value={{state, dispatch}}>  
      {children}
    </UserStateContext.Provider>
  );
};
  
const useUserContext = () => {
  const context = React.useContext(UserStateContext);
  console.log()
  if (!context) {
    throw new Error(
      "`useUserContext` must be called from a descendent of the `UserProvider`."
    );
  }
  return context;
};

export { UserProvider, useUserContext };
