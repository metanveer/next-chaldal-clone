import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/userModel";
import { hashPassword, verifyPassword } from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Unaccepted request method" });
    return;
  }
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Access denied! Unathenticated!" });
      return;
    }

    await dbConnect();

    const userExist = await User.findById(session.user._id);

    if (!userExist) {
      res.status(404).json({ error: "User not found!" });
      return;
    }

    if (!userExist.password) {
      res.status(417).json({ error: "Can't verify new password!" });
      return;
    }

    const dbOldPassword = userExist.password;

    const { oldPassword, newConfirmedPassword } = req.body;

    if (!newConfirmedPassword || newConfirmedPassword.trim().length < 6) {
      res.status(422).json({
        error: "Password must be min 6 characters long",
      });
      return;
    }

    if (oldPassword === newConfirmedPassword) {
      res.status(406).json({
        error:
          "Your new password is identical to the old one. Please choose another...",
      });
      return;
    }

    try {
      const isValid = await verifyPassword(oldPassword, dbOldPassword);
      if (!isValid) {
        res.status(412).json({ error: "Old password didn't match!" });
        return;
      }

      const newHashedPassword = await hashPassword(newConfirmedPassword);

      const response = await User.updateOne(
        { _id: session.user._id },
        { $set: { password: newHashedPassword } }
      );

      console.log(response);

      if (response.nModified === 1) {
        res.status(200).json({ message: "Password updates successfully!" });
        return;
      }
      res.status(501).json({ error: "Failed to save new password!" });
      return;
    } catch (error) {
      console.log("error updating pw:", error);
      res.status(500).json({ error: "Unexpected error occured" });
      return;
    }
  }
}
