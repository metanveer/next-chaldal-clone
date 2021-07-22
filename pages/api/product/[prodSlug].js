import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

const productBySlug = async (req, res) => {
  if (req.method === "GET") {
    const { prodSlug } = req.query;

    try {
      await dbConnect();
      const product = await getProductBySlug(productModel, prodSlug);

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  }
};

export async function getProductBySlug(Model, slug) {
  const product = await Model.findOne({ Slug: slug });
  return JSON.parse(JSON.stringify(product));
}

export default productBySlug;
