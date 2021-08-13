import { getSession } from "next-auth/client";
import Checkout from "../../components/checkout/checkout";
import dbConnect from "../../db/dbConnect";
import { ObjectId } from "mongodb";
import { useSelector } from "react-redux";
import EmptyCart from "../../components/common/ui/empty-cart";

const CheckoutPage = ({ user }) => {
  const { items } = useSelector((state) => state.cart);

  if (items.length !== 0) {
    return <Checkout user={user} />;
  }

  return <EmptyCart checkout />;
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

export default CheckoutPage;
