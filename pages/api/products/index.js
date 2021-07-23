import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      const product = await productModel.create(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add new product" });
    }
  }
  if (method === "GET") {
    try {
      const products = await getProducts(productModel, "", 1, 20);
      res.status(201).json(products);
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add new product" });
    }
  }
}

export async function getProducts(Model, query, page, size) {
  const rgxSearchSet = query.split(" ").map((word) => new RegExp(word, "i"));
  const options = {
    page: page,
    limit: size,
  };
  const result = await Model.paginate(
    { NameWithoutSubText: rgxSearchSet },
    options,
    function (err, result) {
      return result;
    }
  );
  return JSON.parse(JSON.stringify(result));
}
