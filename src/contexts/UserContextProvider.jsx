import React, { createContext } from "react";

const DefaultValue = {
  currentUser: null,
};

export const UserContext = createContext(DefaultValue);

function UserContextProvider({ children }) {
  return (
    <UserContext.Provider value={DefaultValue}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
