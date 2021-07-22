import { getSession } from "next-auth/client";
import React from "react";

import LoginForm from "../../components/login/LoginForm";

const LoginPage = () => {
  return (
    <div style={{ margin: "8px" }}>
      <LoginForm />
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/food",
        permanent: false,
      },
    };
  }
  if (!session) {
    return {
      props: {},
    };
  }
};

export default LoginPage;
