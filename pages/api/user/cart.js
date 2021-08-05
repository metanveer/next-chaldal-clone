import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/userModel";

const cartController = async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Access denied! Unathenticated!" });
      return;
    }

    await dbConnect();

    try {
      const user = await User.findById(session.user._id, "name cart");
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve data" });
    }
  }

  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    await dbConnect();

    const { cartState } = req.body;

    try {
      const response = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { cart: cartState } },
        {
          new: true,
          fields: "-password",
          // runValidators: true,
        }
      );

      res.status(200).json({
        message: "Cart saved!",
        data: response,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `"Error saving cart!": ${error}`,
      });
    }
  }
};

export default cartController;
