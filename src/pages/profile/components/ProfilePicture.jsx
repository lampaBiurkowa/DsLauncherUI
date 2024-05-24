import React, { useEffect } from "react";
import "./ProfilePicture.scss";
import useFileDialog from "../hooks/useFileDialog";

function ProfilePicture({ src, readonly, onSelected }) {
  const { openedFiles, showDialog } = useFileDialog([
    {
      name: "Images",
      extensions: ["png", "jpg"],
    },
  ]);

  useEffect(() => {
    if (openedFiles.length == 1) {
      onSelected(openedFiles[0]);
    }
  }, [openedFiles]);

  console.log('src', src);
  return (
    <div className={`profile-picture`}>
      <div style={{ backgroundImage: `url(${src})` }} className="image" />
      {!readonly ? (
        <button className="select-btn" onClick={showDialog}>
          <i class="las la-camera"></i>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfilePicture;
