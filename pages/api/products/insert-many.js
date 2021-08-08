import dbConnect from "../../../db/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  const client = await dbConnect();
  const Product = client.db().collection("products");

  if (method === "POST") {
    try {
      const product = await Product.insertMany(req.body);
      res.status(201).json({ success: true, data: product });
      client.close();
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add new product" });
      client.close();
    }
  }
}
