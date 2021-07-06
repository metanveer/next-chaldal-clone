import { useEffect, useState } from "react";

function useBounceAnimation(param, activeStyle, timeOut) {
  const [bounceStyle, setBounceStyle] = useState(null);

  useEffect(() => {
    setBounceStyle(activeStyle);
    let timer = setTimeout(() => setBounceStyle(null), timeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [param]);

  return bounceStyle;
}

export default useBounceAnimation;
