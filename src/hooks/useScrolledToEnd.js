import { useEffect, useState } from "react";

export function useScrolledToBottom(ref, threshold = 10) {
  const [scrolledToBottom, setScrolledToBottom] = useState();

  useEffect(() => {
    function onScrolled(event) {
      setScrolledToBottom(
        ref.current.offsetHeight + ref.current.scrollTop >=
          ref.current.scrollHeight - threshold
      );
    }

    ref.current?.addEventListener("scroll", onScrolled);
    return () => {
      ref.current?.removeEventListener("scroll", onScrolled);
    };
  }, []);

  return scrolledToBottom;
}
