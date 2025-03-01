import React, { useEffect, useState } from "react";
import useFileDialog from "@/hooks/useFileDialog";
import Dialog from "@/components/dialog/Dialog";
import "./ProfilePicture.scss";

function ProfilePicture({ src, readonly, onSelected }) {
  const [menuOpen, setMenuOpen] = useState();

  const { openedFiles, showDialog } = useFileDialog([
    {
      name: "Images",
      extensions: ["png", "jpg"],
    },
  ]);

  useEffect(() => {
    if (openedFiles.length == 1) {
      onSelected({ path: openedFiles[0] });
    }
  }, [openedFiles]);

  return (
    <div className={`profile-picture`}>
      <div
        style={{ backgroundImage: `url(${src ?? "/img/user.png"})` }}
        className="image"
      />
      {!readonly ? (
        <button
          className="select-btn"
          onClick={() => {
            if (src?.length > 0) {
              setMenuOpen(true);
            } else {
              showDialog();
            }
          }}
        >
          <i class="las la-edit"></i>
        </button>
      ) : (
        <></>
      )}
      <Dialog
        open={menuOpen}
        header="Edit profile picture"
        onClosed={() => setMenuOpen(false)}
      >
        <div className="change-picture-dialog">
          <button
            onClick={() => {
              setMenuOpen(false);
              showDialog();
            }}
          >
            <div>
              <i className="las la-upload"></i>
            </div>
            <span>Upload</span>
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onSelected({ path: "", name: "" });
            }}
          >
            <div>
              <i className="las la-trash"></i>
            </div>
            <span>Remove</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default ProfilePicture;
