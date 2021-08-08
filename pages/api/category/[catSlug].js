import dbConnect from "../../../db/dbConnect";

const categoryBySlug = async (req, res) => {
  const { catSlug } = req.query;

  if (req.method === "GET") {
    try {
      const client = await dbConnect();
      const Category = client.db().collection("categories");
      const category = await getCategoryBySlug(Category, catSlug);
      res.status(200).json(category);
      client.close();
    } catch (error) {
      client.close();
      console.log(error);
    }
  }
};

export async function getCategoryBySlug(Category, slug) {
  const category = await Category.findOne({ slug: slug });
  return category;
}

export default categoryBySlug;
