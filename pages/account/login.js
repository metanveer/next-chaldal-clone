import { getSession } from "next-auth/client";
import React from "react";
import AuthSwitcher from "../../components/login/auth-switcher";

const LoginPage = () => {
  return (
    <div style={{ margin: "8px" }}>
      <AuthSwitcher />
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
