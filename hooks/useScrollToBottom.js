import { useEffect } from "react";

function useScrollToBottom(bottomRef, listLength) {
  function scrollToBottom() {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    scrollToBottom();
  }, [listLength]);
}

export default useScrollToBottom;
