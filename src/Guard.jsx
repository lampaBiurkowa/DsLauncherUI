import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

export const GuardMode = {
  NAVIGATE: "navigate",
  HIDE: "hide",
};

function Guard({ developerOnly, mode = GuardMode.NAVIGATE, children }) {
  let { currentUser: user } = useContext(UserContext);
  let navigate = useNavigate();

  function canAccess() {
    if (developerOnly === true) {
      return user?.developer != null;
    }
    return user != null;
  }

  useEffect(() => {
    if (!canAccess() && mode == GuardMode.NAVIGATE) {
      navigate("/login", { replace: true });
    }
  }, []);

  return !canAccess() ? "" : children;
}

export default Guard;
