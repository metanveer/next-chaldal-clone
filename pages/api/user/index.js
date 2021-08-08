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
        { password: 0 }
      );
      res.status(200).json({ data: user });
      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve data" });
      client.close();
    }
  }
};

export default handler;
