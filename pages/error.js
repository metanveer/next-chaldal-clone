import { useRouter } from "next/dist/client/router";
import React from "react";
import Message from "../components/common/message";

const ErrorPage = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  return (
    <Message
      error
      title="Unexpected Error Occured!"
      info={`Error type: ${query?.type}`}
      text={`Error message: ${query?.message}`}
    />
  );
};

export default ErrorPage;
