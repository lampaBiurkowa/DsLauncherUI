import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
import useClickOutside from "./hooks/useClickOutside";

function Dropdown({ className, hAlign, children }) {
  const [isOpen, setOpen] = useState(false);
  const clickOutsideTrigger = useClickOutside(() => {
    setOpen(false);
  });
  const menuRef = useRef();

  useEffect(() => {
    if (isOpen && menuRef.current) {
    }
  }, [isOpen]);

  function toggle() {
    setOpen(!isOpen);
  }

  return (
    <div className={`${className} dropdown`}>
      <button onClick={toggle} ref={clickOutsideTrigger}>
        <i className="la la-ellipsis-h" />
      </button>
      {isOpen ? (
        <div className="menu" ref={menuRef}>
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dropdown;
