import React, { useEffect, useRef, useState } from "react";
import "./ComboBox.scss";
import Popup from "../popup/Popup";

function ComboBox({ onItemSelected, children }) {
  const [popupOpen, setPopupOpen] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const popupTargetRef = useRef();

  useEffect(() => {
    onItemSelected?.(selectedIndex);
  }, [selectedIndex]);

  return (
    <div className="combo-box">
      <button ref={popupTargetRef} onClick={() => setPopupOpen(true)}>
        {React.Children.toArray(children)[selectedIndex]}
        <i class="las la-angle-down"></i>
      </button>
      <Popup targetRef={popupTargetRef} open={popupOpen} setOpen={setPopupOpen}>
        <div className="popup-content">
          {children?.map((child, key) => {
            return (
              <button
                className="plain"
                key={key}
                onClick={() => {
                  setSelectedIndex(key);
                  setPopupOpen(false);
                }}
              >
                {child}
              </button>
            );
          })}
        </div>
      </Popup>
    </div>
  );
}

export default ComboBox;
