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
        { _id: ObjectId(session.user._id) },
        { projection: { name: 1, addresses: 1 } }
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

    const { addressData } = req.body;

    try {
      const client = await dbConnect();
      const User = client.db().collection("users");

      const newAddress = { _id: new ObjectId(), ...addressData };

      const response = await User.findOneAndUpdate(
        { email: session.user.email },
        { $push: { addresses: newAddress } },
        {
          returnDocument: "after",
          projection: { password: 0 },
        }
      );

      res.status(200).json({
        message: "Address Added!",
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
  if (req.method === "PATCH") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const { addressId, addressData: adr } = req.body;

    try {
      const client = await dbConnect();
      const User = client.db().collection("users");

      const response = await User.findOneAndUpdate(
        {
          email: session.user.email,
          "addresses._id": ObjectId(addressId),
        },
        {
          $set: {
            "addresses.$": {
              _id: ObjectId(addressId),
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
          returnDocument: "after",
          projection: { password: 0 },
        }
      );

      console.log("response at patch", response);

      res.status(200).json({
        message: "Address updated!",
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
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const { addressId: id } = req.body;

    try {
      const client = await dbConnect();
      const User = client.db().collection("users");

      const response = await User.findOneAndUpdate(
        {
          email: session.user.email,
          "addresses._id": ObjectId(id),
        },
        {
          $pull: {
            addresses: {
              _id: ObjectId(id),
            },
          },
        },
        {
          returnDocument: "after",
          projection: { password: 0 },
        }
      );

      res.status(200).json({
        message: "Address deleted!",
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
