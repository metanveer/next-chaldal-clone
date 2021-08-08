import dbConnect from "../../../db/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const client = await dbConnect();
      const db = client.db();

      const categories = await db.collection("categories").find().toArray();

      res.status(200).json(categories);
      client.close();
    } catch (error) {
      res.status(400).json({ error: "failed to get categories" });
    }
  }
}
