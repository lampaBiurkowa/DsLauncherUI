import { UserContext } from "@/contexts/UserContextProvider";
import { getProfilePath } from "@/services/PathResolver";
import { useEffect, useContext, useState } from "react";

export default function useProfileImage() {
  const { currentUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    setProfileImage(
      getProfilePath(currentUser?.guid)
    );
  }, [currentUser]);

  return profileImage;
}
