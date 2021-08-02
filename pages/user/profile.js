import { getSession } from "next-auth/client";
import ProfileForm from "../../components/user-profile/profile-form";
import dbConnect from "../../db/dbConnect";
import User from "../../models/userModel";

const ProfilePage = ({ user }) => {
  return <ProfileForm user={user} />;
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    await dbConnect();
    const user = await User.findById(session.user._id, "-password");
    if (user) {
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
        },
      };
    }
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/account/login",
      permanent: false,
    },
  };
};

export default ProfilePage;
