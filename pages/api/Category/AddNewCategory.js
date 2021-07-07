import dbConnect from "../../../db/dbConnect";
import Category from "../../../models/categoryModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add new category" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid request method" });
  }
}
