import dbConnect from "../../../db/dbConnect";
import productModel from "../../../models/productModel";

export default async (req, res) => {
  const { text = "", page = 1, size = 20 } = req.query;

  dbConnect();

  const result = await getPagedProducts(text, page, size, productModel);

  res.status(200).json(result);
};

export async function getPagedProducts(query, page, size, Model) {
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
