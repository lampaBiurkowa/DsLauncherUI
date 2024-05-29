import React, { useMemo, useRef, useState } from "react";
import "./CollapsedArea.scss";

function CollapsedArea({ collapsedMaxHeight = 100, children }) {
  const [collapsed, setCollapsed] = useState();
  const contentAreaRef = useRef();

  const contentHeight = useMemo(() => {
    let height = contentAreaRef.current?.getBoundingClientRect().height ?? 0;
    if (height > collapsedMaxHeight) {
      setCollapsed(true);
    }
    return height;
  }, [children, contentAreaRef]);

  return (
    <div className="collapsed-area-container">
      <div
        className={`collapsed-area-controller ${collapsed ? "collapsed" : ""}`}
        style={{ maxHeight: collapsed ? `${collapsedMaxHeight}px` : "none" }}
      >
        <div className="collapsed-area-content" ref={contentAreaRef}>
          {children}
        </div>
      </div>
      {contentHeight > collapsedMaxHeight ? (
        <button className="tiny plain" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "Show more" : "Show less"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CollapsedArea;
