import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Access denied! Unathenticated!" });
      return;
    }

    try {
      const client = await dbConnect();
      const User = client.db().collection("users");

      const user = await User.findOne(
        { _id: ObjectId(session.user._id) },
        { name: 1, cart: 1 }
      );
      res.status(200).json({ data: user });
      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve data" });
      client.close();
    }
  }

  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const { cartState } = req.body;

    try {
      const client = await dbConnect();
      const User = client.db().collection("users");

      const response = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { cart: cartState } },
        {
          returnNewDocument: true,
          projection: { password: 0 },
        }
      );

      res.status(200).json({
        message: "Cart saved!",
        data: response,
      });
      client.close();
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `"Error saving cart!": ${error}`,
      });
      client.close();
    }
  }
};

export default handler;
