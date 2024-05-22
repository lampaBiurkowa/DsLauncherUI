import { useState, useEffect } from "react";

// const userApi = new UserApi();

function usePlayerBought(userLogin, productId) {
  let [playerBought, checkIfPlayerBought] = useState();

  useEffect(() => { //TODO
    // userApi.userGetNameProductsGet(userLogin, (error, data) => {
    //   if (error === null) {
    //     checkIfPlayerBought(data.some(item => item.id == productId));
    //   }
    // });
  }, []);

  return playerBought;
}

export default usePlayerBought;
