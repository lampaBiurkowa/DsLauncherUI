import React, { useEffect, useState } from "react";
import useClickOutside from "./hooks/useClickOutside";
import "./Popup.scss";

function Popup({ open, setOpen, targetRef, children }) {
  const [dimensions, setDimensions] = useState({});
  const clickOutsideRef = useClickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    const rect = targetRef?.current?.getBoundingClientRect();

    if (rect) {
      setDimensions({
        left: rect.left + "px",
        width: rect.width + "px",
        top: rect.top + "px",
        height: rect.height + "px",
      });
    }
  }, [open]);

  return (
    <div
      className="popup-container"
      style={{
        ...dimensions,
        pointerEvents: open ? "initial" : "none",
      }}
    >
      {open ? (
        <div className="popup" ref={clickOutsideRef}>
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Popup;
