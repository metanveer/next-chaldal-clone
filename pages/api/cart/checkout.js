import { getSession } from "next-auth/client";
import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";
import { customAlphabet } from "nanoid";

const handler = async (req, res) => {
  if (req.method === "POST") {
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
      const Product = client.db().collection("products");
      const Order = client.db().collection("orders");

      const userId = ObjectId(session.user._id);

      // let cart = await Cart.findOne({ _id: userId });
      // let success = [];
      // let failed = [];

      // for (let i = 0; i < cart.products.length; i++) {
      //   let product = cart.product[i];

      //   let result = await Product.updateMany(
      //     {
      //       _id: ObjectId(product._id),
      //       ExpressQuantitiesByWarehouseId: { $gte: product.qty },
      //     },
      //     {
      //       $inc: { ExpressQuantitiesByWarehouseId: -product.qty },
      //       $push: {
      //         reservations: {
      //           ExpressQuantitiesByWarehouseId: product.qty,
      //           _id: userId,
      //           createdOn: new Date(),
      //         },
      //       },
      //     },
      //     {
      //       upsert: true,
      //     }
      //   );
      //   if (result.nModified == 0) failed.push(product);
      //   else success.push(product);
      // }

      // if (failed.length > 0) {
      //   for (let i = 0; i < success.length; i++) {
      //     Product.updateMany(
      //       {
      //         _id: ObjectId(success[i]._id),
      //         "reservations._id": userId,
      //       },
      //       {
      //         $inc: { ExpressQuantitiesByWarehouseId: success[i].qty },
      //         $pull: { reservations: { _id: userId } },
      //       }
      //     );
      //   }

      //   res.status(422).json({
      //     error:
      //       "Checkout failed! One or more items in your cart is out of stock!",
      //   });
      //   client.close();
      //   return;
      // }

      const { deliveryAddress, products, shippingFee, totalOrderPrice } =
        req.body;

      const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const nanoid = customAlphabet(alphabet, 14);

      const newOrder = await Order.insertOne({
        orderId: nanoid(),
        orderedBy: userId,
        createdAt: new Date(),
        payment: {
          method: "cash-on-delivery",
          status: "pending",
        },
        deliveryAddress: deliveryAddress,
        products: products,
        currency: "BDT",
        shippingFee: shippingFee,
        totalOrderPrice: totalOrderPrice,
      });

      res.status(200).json({ success: true, response: newOrder });

      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Unable to get user cart! ${error}` });
      client.close();
    }
  }
};

export default handler;
