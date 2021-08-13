import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Not authenticated!" });
      return;
    }

    const { _id, packSize, image, itemName, discPrice, regPrice, hasVisited } =
      req.body;

    try {
      const client = await dbConnect();
      const Cart = client.db().collection("cart");

      // CHECK IF THE ITEM NOT EXISTS IN USER'S ACTIVE CART OR USER CART DOESN'T EXIST
      const userCart = await Cart.findOne({
        _id: ObjectId(session.user._id),
        state: "active",
      });
      if (!userCart) {
        const response = await Cart.insertOne({
          _id: ObjectId(session.user._id),
          state: "active",
          modifiedOn: new Date(),
          products: [
            {
              _id: ObjectId(_id),
              qty: 1,
              packSize,
              image,
              itemName,
              discPrice,
              regPrice,
              hasVisited: true,
            },
          ],
        });

        res.status(200).json({
          message: "success creating new user cart and item inserted",
          response: response,
        });
        client.close();
        return;
      }

      // IF EXISTS, INCREASE QTY BY ONE
      const updateQuery = {
        _id: ObjectId(session.user._id),
        "products._id": ObjectId(_id),
        state: "active",
      };
      const itemInUserCart = await Cart.findOne(updateQuery);

      console.log("itemin cart", itemInUserCart);

      if (itemInUserCart) {
        const updates = {
          $set: {
            modifiedOn: new Date(),
            "products.$._id": ObjectId(_id),
            "products.$.hasVisited": true,
          },
          $inc: { "products.$.qty": 1 },
        };

        const response = await Cart.updateOne(updateQuery, updates);
        res.status(200).json({
          message: "successfully updated qty of item in the cart",
          response: response,
        });
        client.close();
        return;
      }

      // IF NOT PUSH THE ITEM TO THE CART WITH QTY ONE

      const updates = {
        $set: { modifiedOn: new Date() },
        $push: {
          products: {
            _id: ObjectId(_id),
            qty: 1,
            packSize,
            image,
            itemName,
            discPrice,
            regPrice,
            hasVisited: true,
          },
        },
      };

      const response = await Cart.updateOne(
        {
          _id: ObjectId(session.user._id),
          state: "active",
        },
        updates
      );
      res.status(200).json({
        message: "successfully pushed the item with qty 1",
        response: response,
      });

      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: `"Error upating cart!": ${error}`,
      });
      client.close();
    }
  }
};

export default handler;
