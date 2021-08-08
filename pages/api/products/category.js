import { getPaginatedDocs } from ".";
import dbConnect from "../../../db/dbConnect";

export default async function handler(req, res) {
  const client = await dbConnect();
  const Product = client.db().collection("products");

  const { id, page, size } = req.query;

  const queryOptions = { AllCategoryIds: Number(id) };

  const result = await getPaginatedDocs(Product, queryOptions, page, size);

  res.status(200).json(result);
  client.close();
}
