import dbConnect from "../../../db/dbConnect";
import categoryModel from "../../../models/categoryModel";

export default async function handler(req, res) {
  dbConnect();
  const data = await getCategoryBySlug(categoryModel, req.query.slug);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(200).json({});
  }
}

export async function getCategoryBySlug(Model, slug) {
  const category = await Model.findOne({
    slug: slug,
  });

  return JSON.parse(JSON.stringify(category));
}
