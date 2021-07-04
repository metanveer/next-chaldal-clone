import { useEffect, useState } from "react";

function useFocusElement(elementRef, param, activeStyle) {
  const [focusedStyle, setFocusedStyle] = useState(null);

  function scrollToElement() {
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  useEffect(() => {
    scrollToElement();
    setFocusedStyle(activeStyle);
    let timer = setTimeout(() => setFocusedStyle(null), 800);
    return () => {
      clearTimeout(timer);
    };
  }, [param]);

  return focusedStyle;
}

export default useFocusElement;
