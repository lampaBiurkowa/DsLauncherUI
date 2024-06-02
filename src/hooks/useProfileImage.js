import { UserContext } from "@/contexts/UserContextProvider";
import { deafultBucket, publicPath } from "@/App";
import { useEffect, useContext, useState } from "react";

export default function useProfileImage() {
  const { currentUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState("/img/user.png");

  useEffect(() => {
    if (currentUser?.profileImage) {
      setProfileImage(
        `${publicPath}/${deafultBucket}/${currentUser.profileImage}`
      );
    } else {
      setProfileImage("/img/user.png");
    }
  }, [currentUser]);

  return profileImage;
}
