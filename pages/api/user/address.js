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
      const user = await User.findById(session.user._id, "name addresses");
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

    await dbConnect();

    const { addressData } = req.body;

    try {
      const response = await User.findOneAndUpdate(
        { email: session.user.email },
        { $push: { addresses: addressData } },
        {
          new: true,
          fields: "-password",
          // runValidators: true,
        }
      );

      res.status(200).json({
        message: "Address Added!",
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
  if (req.method === "PATCH") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    await dbConnect();

    console.log("req.body at address", req.body);

    const { addressId, addressData: adr } = req.body;

    try {
      const response = await User.findOneAndUpdate(
        {
          email: session.user.email,
          "addresses._id": addressId,
        },
        {
          $set: {
            "addresses.$": {
              _id: addressId,
              name: adr.name,
              phone: adr.phone,
              address: adr.address,
              union: adr.union,
              upazila: adr.upazila,
              district: adr.district,
              division: adr.division,
            },
          },
        },
        {
          new: true,
          fields: "-password",
          // runValidators: true,
        }
      );

      res.status(200).json({
        message: "Address updated!",
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
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    await dbConnect();

    const { addressId: id } = req.body;

    try {
      const response = await User.findOneAndUpdate(
        {
          email: session.user.email,
          "addresses._id": id,
        },
        {
          $pull: {
            addresses: {
              _id: id,
            },
          },
        },
        {
          new: true,
          fields: "-password",
          // runValidators: true,
        }
      );

      res.status(200).json({
        message: "Address deleted!",
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
