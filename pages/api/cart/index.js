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

    if (!ObjectId.isValid(session.user._id)) {
      res.status(401).json({ error: "Invalid ObjectId!" });
      return;
    }

    try {
      const client = await dbConnect();
      const Cart = client.db().collection("cart");

      const totals = await Cart.aggregate([
        { $match: { _id: ObjectId(session.user._id) } },
        {
          $project: {
            products: 1,
            state: 1,
            modifiedOn: 1,

            totalQty: {
              $sum: "$products.qty",
            },
            totalItemsDiscPrice: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: {
                    $multiply: [
                      { $ifNull: ["$$product.qty", 0] },
                      { $ifNull: ["$$product.discPrice", 0] },
                    ],
                  },
                },
              },
            },
            totalItemsRegPrice: {
              $sum: {
                $map: {
                  input: "$products",
                  as: "product",
                  in: {
                    $multiply: [
                      { $ifNull: ["$$product.qty", 0] },
                      { $ifNull: ["$$product.regPrice", 0] },
                    ],
                  },
                },
              },
            },
          },
        },
      ]).toArray();

      res.status(200).json({ data: totals[0] });

      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Unable to get user cart! ${error}` });
      client.close();
    }
  }
};

export default handler;
