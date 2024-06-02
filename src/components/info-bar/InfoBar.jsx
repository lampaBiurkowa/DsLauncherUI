import React, { useState } from "react";
import "./InfoBar.scss";

export const InfoBarType = Object.freeze({
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "error",
});

function InfoBar({
  type = InfoBarType.Info,
  header,
  text,
  dismissable,
  children,
}) {
  const [open, setOpen] = useState(true);

  if (!open) return <></>;
  return (
    <div className={`info-bar ${type}`}>
      {(() => {
        switch (type) {
          case InfoBarType.Success:
            return <i class="las la-check"></i>;
          case InfoBarType.Warning:
            return <i class="las la-exclamation-triangle"></i>;
          case InfoBarType.Error:
            return <i class="las la-times-circle"></i>;
          default:
            return <i class="las la-info-circle"></i>;
        }
      })()}
      <span className="header">{header}</span>
      <span className="text">{text}</span>
      <div className="content">{children}</div>
      {dismissable ? (
        <button className="capsule dismiss" onClick={() => setOpen(false)}>
          <i class="las la-times"></i>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default InfoBar;
