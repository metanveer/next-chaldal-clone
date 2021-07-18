import dbConnect from "../../../db/dbConnect";
import Product from "../../../models/productModel";

export default async function handler(req, res) {
  await dbConnect();
  const data = await fetchOffers(Product);
  res.status(200).json(data);
}

export async function fetchOffers(Model) {
  const data = await Model.find({
    OfferPictureUrls: { $exists: true, $not: { $size: 0 } },
  });
  return JSON.parse(JSON.stringify(data));
}
