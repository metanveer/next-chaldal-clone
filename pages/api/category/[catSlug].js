import dbConnect from "../../../db/dbConnect";
import categoryModel from "../../../models/categoryModel";

const categoryBySlug = async (req, res) => {
  const { catSlug } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();
      const category = await getCategoryBySlug(categoryModel, catSlug);

      res.status(200).json(category);
    } catch (error) {
      console.log(error);
    }
  }
};

export async function getCategoryBySlug(Category, slug) {
  const category = await Category.findOne({ slug: slug });
  return JSON.parse(JSON.stringify(category));
}

export default categoryBySlug;
