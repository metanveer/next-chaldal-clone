import dbConnect from "../../../db/dbConnect";
import User from "../../../models/userModel";
import { hashPassword } from "../../../utils/auth";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message: "Invalid input: password must be min 6 characters long",
    });
    return;
  }

  await dbConnect();

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(422).json({ message: "User exists already!" });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await User.create({
    email: email,
    password: hashedPassword,
    authProvider: "credentials",
  });

  res.status(201).json({ message: "User created!", data: result });
}
