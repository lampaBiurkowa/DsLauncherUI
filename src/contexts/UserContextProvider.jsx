import React, { createContext, useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

export const UserContext = createContext({
  currentUser: undefined,
  setCurrentUser: () => {},
});

const api = new DsLauncherApiClient();

function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    if (currentUser?.developers == undefined) {
      (async () => {
        setCurrentUser({
          ...currentUser,
          developers: await api.getDeveloperByUser(currentUser.guid),
        });
      })();
    }
  }, [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
