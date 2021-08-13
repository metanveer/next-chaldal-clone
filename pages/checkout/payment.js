import { ObjectId } from "mongodb";
import { getSession } from "next-auth/client";
import React from "react";
import dbConnect from "../../db/dbConnect";

const PaymentPage = ({ order }) => {
  console.log("order", order);
  return <div>{order.orderId}</div>;
};

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  if (session) {
    const client = await dbConnect();
    const Order = client.db().collection("orders");
    console.log(query);
    const order = await Order.findOne(
      { _id: ObjectId(query.order_id) },
      { orderedBy: ObjectId(session.user._id) }
    );
    client.close();
    if (order) {
      return {
        props: {
          order: JSON.parse(JSON.stringify(order)),
        },
      };
    }

    return {
      redirect: {
        destination: "/404",
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

export default PaymentPage;
