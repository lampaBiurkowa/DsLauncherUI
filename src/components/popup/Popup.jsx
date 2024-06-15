import React, { useEffect, useState } from "react";
import useClickOutside from "./hooks/useClickOutside";
import "./Popup.scss";

export const PopupAlignment = Object.freeze({
  Left: "left",
  Right: "right",
});

function Popup({ open, setOpen, targetRef, alignment, children }) {
  const [dimensions, setDimensions] = useState({});
  const popupRef = useClickOutside(() => {
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
        <div
          className="popup"
          ref={popupRef}
          style={{
            left: alignment == PopupAlignment.Left ? "0" : "unset",
            right: alignment == PopupAlignment.Right ? "0" : "unset",
          }}
        >
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Popup;
