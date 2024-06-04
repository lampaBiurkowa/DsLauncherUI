import React, { useEffect, useRef } from "react";

import "./Dialog.scss";

function Dialog({ open, header, onClosed = () => {}, children }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  useEffect(() => {
    dialogRef.current?.addEventListener("close", onClosed);

    return () => {
      dialogRef.current?.removeEventListener("close", onClosed);
    };
  }, []);

  return (
    <dialog ref={dialogRef}>
      <div className="dialog-container">
        <div className="dialog-header">
          <h1>{header}</h1>
          <button className="capsule" onClick={() => onClosed()}>
            <i className="las la-times" />
          </button>
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </dialog>
  );
}

export default Dialog;
