import dbConnect from "../../../db/dbConnect";
import Category from "../../../models/categoryModel";

export default async function handler(req, res) {
  await dbConnect();
  const categories = await fetchCategories(Category);
  res.status(200).json(categories);
}

export async function fetchCategories(CategoryModel) {
  const categories = await CategoryModel.find({});
  return JSON.parse(JSON.stringify(categories));
}
