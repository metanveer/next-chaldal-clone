import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

export default async function handler(req, res) {
  console.log("api", req.query.id);
  dbConnect();
  const data = await getProductsByCategory(productModel, req.query.id);
  //   if (data) {
  //     res.status(200).json(data);
  //   } else {
  //     res.status(200).json([]);
  //   }

  res.status(200).json(data);
}

export async function getProductsByCategory(Model, id) {
  const products = await Model.find({
    AllCategoryIds: id,
  });
  console.log(products);
  return JSON.parse(JSON.stringify(products));
}
