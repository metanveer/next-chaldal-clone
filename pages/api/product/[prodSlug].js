import dbConnect from "../../../db/dbConnect";

const productBySlug = async (req, res) => {
  if (req.method === "GET") {
    const { prodSlug } = req.query;

    try {
      const client = await dbConnect();
      const Product = client.db().collection("products");
      const product = await getProductBySlug(Product, prodSlug);

      res.status(200).json(product);
      client.close();
    } catch (error) {
      console.log(error);
      client.close();
    }
  }
};

export async function getProductBySlug(collection, slug) {
  const product = await collection.findOne({ Slug: slug });
  return product;
}

export default productBySlug;
