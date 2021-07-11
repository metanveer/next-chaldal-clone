import dbConnect from "../../../../db/dbConnect";
import productModel from "../../../../models/productModel";

export default async function handler(req, res) {
  const { method } = req;
  const { searchTerm } = req.query;

  const rgxSearchSet = searchTerm
    .split(" ")
    .map((word) => new RegExp(word, "i"));

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await productModel.find({
        NameWithoutSubText: rgxSearchSet,
      });
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error });
    }
  }
}
