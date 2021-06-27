import dbConnect from "../../../db/dbConnect";
import Product from "../../../models/productModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error });
    }
  }
}
