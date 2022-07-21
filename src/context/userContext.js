import React, { createContext } from "react";

const UserContext = createContext();

const UIProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UIProvider;
