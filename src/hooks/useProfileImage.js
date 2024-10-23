import { UserContext } from "@/contexts/UserContextProvider";
import { publicPath, usersBucket } from "@/App";
import { useEffect, useContext, useState } from "react";

export default function useProfileImage() {
  const { currentUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    if (currentUser?.profileImage) {
      setProfileImage(
        `${publicPath}/${usersBucket}/${currentUser.profileImage}`
      );
    } else {
      setProfileImage(undefined);
    }
  }, [currentUser]);

  return profileImage;
}
