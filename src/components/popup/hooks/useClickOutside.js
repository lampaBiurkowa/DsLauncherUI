import { useEffect, useRef } from "react";

function useClickOutside(callback) {
  const ref = useRef();

  useEffect(() => {
    function handleDocumentClick(ev) {
      if (ref.current && !ref.current.contains(ev.target)) {
        callback();
      }
    }

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [ref]);

  return ref;
}

export default useClickOutside;
