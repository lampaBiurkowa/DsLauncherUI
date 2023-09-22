import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Protected({ developerOnly, children }) {
  let { currentUser: user } = useContext(UserContext);
  let navigate = useNavigate();

  function canAccess() {
    if (developerOnly === true) {
      return user?.developer != null;
    }
    return user != null;
  }

  useEffect(() => {
    if (!canAccess()) {
      navigate("/login", { replace: true });
    }
  }, []);

  return !canAccess() ? "" : children;
}

export default Protected;
