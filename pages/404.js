import React from "react";
import Message from "../components/common/message";

const NotFoundPage = () => {
  return (
    <Message
      title="Page Not Found!"
      info="We're unable to find the page you're looking for!"
      text="Either the content is no longer available or you might have made a typo
  in the URL!"
    />
  );
};

export default NotFoundPage;
