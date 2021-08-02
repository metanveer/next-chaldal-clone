import dbConnect from "../../../db/dbConnect";
import { getSession } from "next-auth/client";
import User from "../../../models/userModel";

export const getUsers = async (User) => {
  const users = await User.find({}, "-password");
  return JSON.parse(JSON.stringify(users));
};

const usersController = async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    await dbConnect();
    const users = await getUsers(User);

    res.status(200).json(users);
    return;
  }
};

export default usersController;
