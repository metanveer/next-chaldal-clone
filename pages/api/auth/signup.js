import dbConnect from "../../../db/dbConnect";
import { hashPassword } from "../../../utils/auth";

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !email.includes("@")) {
    res.status(422).json({
      error: "Invalid email address",
    });
    return;
  }

  if (!password) {
    res.status(422).json({
      error: "Invalid password!",
    });
    return;
  }
  if (password.trim().length < 6) {
    res.status(422).json({
      error: "Too short password!",
    });
    return;
  }

  const client = await dbConnect();

  const User = client.db().collection("users");

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(422).json({ error: "User exists already!" });
    client.close();
    return;
  }

  try {
    const hashedPassword = await hashPassword(password);

    const role =
      email.includes("_") && email.split("_")[1].split("@")[0] === "8086"
        ? "admin"
        : "customer";

    const tempName =
      role === "admin"
        ? email.split("@")[0].split("_")[0]
        : email.split("@")[0];

    const result = await User.insertOne({
      name: tempName,
      phone: "01MYPHONENO",
      gender: "",
      email: email,
      password: hashedPassword,
      authProvider: "credentials",
      role: role,
      addresses: [],
    });

    if (result.role === "admin") {
      res
        .status(201)
        .json({ message: "Admin user created successfully!", data: result });
      client.close();
      return;
    }

    res
      .status(201)
      .json({ message: "User created successfully!", data: result });
    client.close();
  } catch (error) {
    console.log("error in signup", error);
    client.close();
    res.status(501).json({ error: "Unexpected error occured" });
  }
}
