import dbConnect from "../../../db/dbConnect";
import Product from "../../../models/productModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      const product = await Product.insertMany(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add new product" });
    }
  }
}
