import { useState, useEffect } from "react";
import { UserApi } from "@/services/api/UserApi";

const userApi = new UserApi();

function usePlayerBought(userLogin, productId) {
  let [playerBought, checkIfPlayerBought] = useState();

  useEffect(() => {
    userApi.userGetNameProductsGet(userLogin, (error, data) => {
      if (error === null) {
        console.log(data);
        checkIfPlayerBought(data.some(item => item.id == productId));
      }
    });
  }, []);

  return playerBought;
}

export default usePlayerBought;
