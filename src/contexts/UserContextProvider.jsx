import React, { createContext } from "react";

export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
