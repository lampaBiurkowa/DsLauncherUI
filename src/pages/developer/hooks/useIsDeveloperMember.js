import { UserContext } from "@/contexts/UserContextProvider";
import { useContext, useMemo } from "react";
import { useDeveloper } from "./useDeveloper";

export function useIsDeveloperMember(developerGuid) {
  const { currentUser } = useContext(UserContext);
  const [developer, _] = useDeveloper(developerGuid);

  const isMember = useMemo(() => {
    return developer?.userGuids?.includes(currentUser?.guid) ?? false;
  }, [developer, currentUser]);

  return isMember;
}
