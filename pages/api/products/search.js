import { getPaginatedDocs } from ".";
import dbConnect from "../../../db/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { q, page, size } = req.query;

    const client = await dbConnect();
    const Product = client.db().collection("products");

    const rgxSearchSet = q?.split(" ").map((word) => new RegExp(word, "i"));

    const query = { NameWithoutSubText: { $in: rgxSearchSet } };

    const result = await getPaginatedDocs(Product, query, page, size);

    res.status(200).json(result);
    client.close();
  }
}
