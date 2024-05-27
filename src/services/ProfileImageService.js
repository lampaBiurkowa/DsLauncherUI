import { deafultBucket, publicPath } from "../App";
import { UsersCache } from "./CacheService";
import { useState, useEffect } from "react";

function useProfileImage(id) {
  let [profileImage, setProfileImage] = useState();

  useEffect(() => {
    async function fetchProfileImage() {
      if (id) {
          const profileImage = (await UsersCache.getById(id))?.model.profileImage;
          if (profileImage) {
            setProfileImage(`${publicPath}/${deafultBucket}/${profileImage}`);
            return;
          }
      }

      setProfileImage(`${publicPath}/${deafultBucket}/0a032d94-7b1b-4e02-9a31-5566e90710d3.jpeg`);
    }
    fetchProfileImage();
  }, []);

  return profileImage;
}

export default useProfileImage;