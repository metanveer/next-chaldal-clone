import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

export default async function handler(req, res) {
  const { id = "", page = 1, size = 20 } = req.query;
  dbConnect();
  const result = await getProductsByCatId(productModel, id, page, size);
  res.status(200).json(result);
}

export async function getProductsByCatId(Model, id, page, size) {
  const options = {
    page: page,
    limit: size,
  };

  const result = await Model.paginate(
    { AllCategoryIds: id },
    options,
    function (err, result) {
      return result;
    }
  );
  return JSON.parse(JSON.stringify(result));
}
