import { UserContext } from "@/contexts/UserContextProvider";
import { ConfigurationHandler } from "@/services/ConfigurationService";
import { useEffect, useContext, useState } from "react";

export default function useProfileImage() {
  const { currentUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    if (currentUser?.profileImage) {
      setProfileImage(
        `${ConfigurationHandler.getSupabaseUrl()}/${ConfigurationHandler.getCoreBucketName()}/${currentUser.profileImage}`
      );
    } else {
      setProfileImage(undefined);
    }
  }, [currentUser]);

  return profileImage;
}
