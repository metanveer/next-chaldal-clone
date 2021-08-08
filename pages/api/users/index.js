import dbConnect from "../../../db/dbConnect";
import { getSession } from "next-auth/client";

export const getUsers = async (User) => {
  const users = await User.find({}, { password: 0 }).toArray();
  return users;
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const client = await dbConnect();
    const User = client.db().collection("users");

    const users = await getUsers(User);

    res.status(200).json(users);
    client.close();

    return;
  }
};

export default handler;
