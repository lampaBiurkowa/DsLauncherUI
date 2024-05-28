import React, { createContext } from "react";
import { DsIdentityApiClient } from "../services/DsIdentityApiClient";
import { LocalStorageHandler } from "../services/LocalStorageService";

const currentUserId = LocalStorageHandler.getUser();
let currentUser = null;
const userApi = new DsIdentityApiClient();

async function getUserData(userId) {
    if (!userId) return null;
    currentUser = await userApi.getUserById(userId);
    console.log(currentUser);
}
currentUser = await getUserData(currentUserId);
const DefaultValue = {
  currentUser: currentUser,
};

export const UserContext = createContext(DefaultValue);

function UserContextProvider({ children }) {
  return (
    <UserContext.Provider value={DefaultValue}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
