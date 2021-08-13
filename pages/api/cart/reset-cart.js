import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    try {
      const client = await dbConnect();
      const Cart = client.db().collection("cart");

      const userCart = await Cart.findOne({
        _id: ObjectId(session.user._id),
      });
      if (!userCart) {
        res.status(200).json({
          error: "No cart found!",
        });
        client.close();
        return;
      }

      const response = await Cart.updateOne(
        {
          _id: ObjectId(session.user._id),
        },
        {
          $set: {
            modifiedOn: new Date(),
            products: [],
          },
        }
      );
      res.status(200).json({
        message: "All products removed from the cart!",
        response: response,
      });
      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `"Error reseting cart!": ${error}`,
      });
      client.close();
    }
  }
};

export default handler;
