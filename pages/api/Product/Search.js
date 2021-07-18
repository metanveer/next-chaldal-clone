import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

export default async (req, res) => {
  const { q = "", page = 1, size = 20 } = req.query;

  dbConnect();

  const result = await getPagedProducts(productModel, q, page, size);

  res.status(200).json(result);
};

export async function getPagedProducts(Model, query, page, size) {
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
