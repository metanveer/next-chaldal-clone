import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/userModel";

const userController = async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Access denied! Unathenticated!" });
      return;
    }

    await dbConnect();

    try {
      const user = await User.findById(
        session.user._id,
        "-password -addresses"
      );
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve data" });
    }
  }

  if (req.method === "PUT") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const { name, gender, phone } = req.body;

    await dbConnect();

    try {
      //Phone numbers should be unique
      const userWithThisPhone = await User.findOne({ phone: phone });

      if (userWithThisPhone && userWithThisPhone.email !== session.user.email) {
        res.status(422).json({
          error: "Phone number in use. Please provide another one.",
        });
        return;
      }

      const response = await User.findOneAndUpdate(
        { email: session.user.email },
        { name, phone, gender },
        {
          new: true,
          fields: "-password",
          // runValidators: true,
        }
      );

      res.status(200).json({
        message: "Updated successfully",
        data: response,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `"Error updating data!": ${error}`,
      });
    }
  }
};

export default userController;
