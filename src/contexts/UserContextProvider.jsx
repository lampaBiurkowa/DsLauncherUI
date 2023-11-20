import React, { createContext } from "react";
import { ApiClient, UserApi } from "../pages";

const currentUserId = localStorage.getItem('currentUser');
let currentUser = null;
const userApi = new UserApi();
ApiClient.authentications.password = localStorage.getItem('token', );

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    userApi.userGetIdGet(userId, (error, data) => {
      if (error === null) {
        currentUser = data;
        resolve(currentUser);
      } else {
        resolve(null);
      }
    });
  });
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
