import dbConnect from "../../../db/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (!req.query.q) {
      res.status(400).json({ error: "Query param missing!" });
      return;
    }

    try {
      const client = await dbConnect();
      const Product = client.db().collection("products");
      const product = await Product.findOne({ ProductVariantId: +req.query.q });

      if (!product) {
        res.status(404).json({ error: "No product found!" });
        client.close();
        return;
      }

      res.status(200).json({ data: product });
      client.close();
    } catch (error) {
      console.log("Error getting product variant id", error);
      res.status(500).json({ error: "Unexpected error occured!" });
      client.close();
    }
  }
};

export default handler;
