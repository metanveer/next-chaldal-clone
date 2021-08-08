import { getSession } from "next-auth/client";
import ProfileForm from "../../components/user-profile/profile-form";
import dbConnect from "../../db/dbConnect";
import { ObjectId } from "mongodb";

const ProfilePage = ({ user }) => {
  return <ProfileForm user={user} />;
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    const client = await dbConnect();
    const User = client.db().collection("users");
    const user = await User.findOne(
      { _id: ObjectId(session.user._id) },
      { password: 0 }
    );
    client.close();
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
