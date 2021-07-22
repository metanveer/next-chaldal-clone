import { getProducts } from ".";
import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

export default async (req, res) => {
  const { q = "", page = 1, size = 20 } = req.query;

  await dbConnect();

  const result = await getProducts(productModel, q, page, size);

  res.status(200).json(result);
};
