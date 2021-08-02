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
      const user = await User.findById(session.user._id, "-password");
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve data" });
    }
  }
};

export default userController;
