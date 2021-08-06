import dbConnect from "../../../db/dbConnect";
import Product from "../../../models/productModel";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (!req.query.q) {
      res.status(400).json({ error: "Query param missing!" });
      return;
    }

    try {
      await dbConnect();
      const product = await Product.findById(req.query.q);

      if (!product) {
        res.status(404).json({ error: "No product found!" });
        return;
      }

      res.status(200).json({ data: product });
    } catch (error) {
      console.log("Error getting product by _id", error);
      res.status(500).json({ error: "Unexpected error occured!" });
    }
  }
};

export default handler;
