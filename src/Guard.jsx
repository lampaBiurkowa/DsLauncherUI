import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

export const GuardMode = {
  NAVIGATE: "navigate",
  HIDE: "hide",
};

function Guard({ developerGuid, mode = GuardMode.NAVIGATE, children }) {
  const { currentUser: user } = useContext(UserContext);
  const navigate = useNavigate();

  function canAccess() {
    if (developerGuid) {
      return user?.developers?.includes(developerGuid) ?? false;
    }
    return user != null;
  }

  useEffect(() => {
    if (!canAccess() && mode == GuardMode.NAVIGATE) {
      navigate("/login", { replace: true });
    }
  }, []);

  return canAccess() ? children : <></>;
}

export default Guard;
