import { useEffect, useState } from "react";

function useFocusElement(elementRef, param, activeStyle) {
  const [focusedStyle, setFocusedStyle] = useState(null);

  function scrollToElement() {
    elementRef &&
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }

  useEffect(() => {
    elementRef && scrollToElement();
    setFocusedStyle(activeStyle);
    let timer = setTimeout(() => setFocusedStyle(null), 800);
    return () => {
      clearTimeout(timer);
    };
  }, [param]);

  return focusedStyle;
}

export default useFocusElement;
