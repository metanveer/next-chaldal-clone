import dbConnect from "../../../db/dbConnect";
import Category from "../../../models/categoryModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const categories = await Category.find({});
      res.status(201).json({ success: true, data: categories });
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  }
}
