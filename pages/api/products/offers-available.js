import dbConnect from "../../../db/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await dbConnect();
    const Product = client.db().collection("products");
    const data = await fetchOffers(Product);
    res.status(200).json(data);
  }
}

export async function fetchOffers(colleciton) {
  const data = await colleciton
    .find({
      OfferPictureUrls: { $exists: true, $not: { $size: 0 } },
    })
    .toArray();

  return data;
}
