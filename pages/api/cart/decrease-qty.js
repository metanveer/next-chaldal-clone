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

    const { _id, qty } = req.body;

    try {
      const client = await dbConnect();
      const Cart = client.db().collection("cart");

      const userCart = await Cart.findOne({
        _id: ObjectId(session.user._id),
        state: "active",
      });
      if (!userCart) {
        res.status(200).json({
          error: "No active cart found!",
        });
        client.close();
        return;
      }

      const updateQuery = {
        _id: ObjectId(session.user._id),
        state: "active",
        products: { $elemMatch: { _id: ObjectId(_id) } },
      };
      console.log("update query", updateQuery);
      const itemInUserCart = await Cart.find(updateQuery, {
        projection: { "products.$": 1 },
      }).toArray();

      console.log("itemin cart", itemInUserCart[0]);

      if (itemInUserCart) {
        const reqItemQty = itemInUserCart[0]?.products[0]?.qty;

        if (qty === 0 || reqItemQty === 1) {
          const response = await Cart.updateOne(
            {
              _id: ObjectId(session.user._id),
              state: "active",
            },
            {
              $set: {
                modifiedOn: new Date(),
              },
              $pull: { products: { _id: ObjectId(_id) } },
            }
          );
          res.status(200).json({
            message: "successfully removed the item from the cart",
            response: response,
          });
          client.close();
          return;
        }

        if (reqItemQty > 1) {
          const response = await Cart.updateOne(
            {
              _id: ObjectId(session.user._id),
              "products._id": ObjectId(_id),
              state: "active",
            },
            {
              $set: {
                modifiedOn: new Date(),
                "products.$._id": ObjectId(_id),
              },
              $inc: { "products.$.qty": -1 },
            }
          );
          res.status(200).json({
            message: "successfully decreased the qty",
            response: response,
          });
          client.close();
          return;
        }
      }

      res.status(200).json({
        error: "Item not in user cart!",
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
