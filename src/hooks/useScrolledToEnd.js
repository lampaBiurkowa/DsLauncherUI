import { useEffect, useRef, useState } from "react";

export function useScrolledToEnd(callback, threshold = 10) {
  const [scrolledToEnd, setScrolledToEnd] = useState();
  const elementRef = useRef();

  useEffect(() => {
    function onScrolled(event) {
      setScrolledToEnd(
        elementRef.current.offsetHeight + elementRef.current.scrollTop >=
          elementRef.current.scrollHeight - threshold
      );
    }

    if (elementRef.current.scrollHeight <= elementRef.current.offsetHeight) {
      callback?.();
    }

    elementRef.current?.addEventListener("scroll", onScrolled);
    return () => {
      elementRef.current?.removeEventListener("scroll", onScrolled);
    };
  }, []);

  useEffect(() => {
    if (scrolledToEnd) {
      callback?.();
    }
  }, [scrolledToEnd]);

  return elementRef;
}
