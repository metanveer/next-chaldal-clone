import dbConnect from "../../../db/dbConnect";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (!req.query.q) {
      res.status(400).json({ error: "Query param missing!" });
      return;
    }
    console.log(req.query.q);
    try {
      const client = await dbConnect();
      const Product = client.db().collection("products");

      const product = await Product.findOne({ _id: ObjectId(req.query.q) });

      if (!product) {
        res.status(404).json({ error: "No product found!" });
        client.close();
        return;
      }

      res.status(200).json({ data: product });
      client.close();
    } catch (error) {
      console.log("Error getting product by _id", error);

      res.status(500).json({ error: "Unexpected error occured!" });
      client.close();
    }
  }
};

export default handler;
