import dbConnect from "../../../db/dbConnect";
import Category from "../../../models/categoryModel";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const categories = await fetchCategories(Category);
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to get categories" });
    }
  }

  if (method === "POST") {
    try {
      const category = await Category.create(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add new category" });
    }
  }
};

// import dbConnect from "../../../db/dbConnect";
// import Category from "../../../models/categoryModel";

// export default async function handler(req, res) {
//   await dbConnect();
//   const categories = await fetchCategories(Category);
//   res.status(200).json(categories);
// }

export async function fetchCategories(CategoryModel) {
  const categories = await CategoryModel.find({});
  return JSON.parse(JSON.stringify(categories));
}
