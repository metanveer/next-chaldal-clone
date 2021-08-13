import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";

const userController = async (req, res) => {
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
        {
          _id: ObjectId(session.user._id),
        },
        { projection: { password: 0, addresses: 0 } }
      );

      res.status(200).json({ data: user });

      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve data" });
      client.close();
    }
  }

  if (req.method === "PUT") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const { name, gender, phone } = req.body;

    try {
      const client = await dbConnect();
      const User = client.db().collection("users");
      //Phone numbers should be unique
      const userWithThisPhone = await User.findOne({ phone: phone });

      if (userWithThisPhone && userWithThisPhone.email !== session.user.email) {
        res.status(422).json({
          error: "Phone number in use. Please provide another one.",
        });
        client.close();

        return;
      }

      const response = await User.findOneAndUpdate(
        { email: session.user.email },
        { $set: { name, phone, gender } },
        {
          projection: { password: 0 },
          returnDocument: "after",
        }
      );

      res.status(200).json({
        message: "Updated successfully",
        data: response.value,
      });
      client.close();

      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `"Error updating data!": ${error}`,
      });
      client.close();
    }
  }
};

export default userController;
