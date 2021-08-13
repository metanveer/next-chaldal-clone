import dbConnect from "../../../db/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const client = await dbConnect();
    const Product = client.db().collection("products");

    const { page, size } = req.query;

    const result = await getPaginatedDocs(Product, {}, page, size);

    res.status(200).json({
      result,
    });
    client.close();
  }
};

export default handler;

export async function getPaginatedDocs(
  docsCollection,
  queryObj,
  pageNumber,
  pageSize
) {
  const query = queryObj ? queryObj : {};

  const page = pageNumber ? Number(pageNumber) : 1;
  const size = pageSize ? Number(pageSize) : 20;

  const cursor = await docsCollection.find(query);

  const totalDocs = await cursor.count();
  const totalPages = Math.ceil(totalDocs / size);
  const docs = await cursor
    .sort({ _id: 1 })
    .skip(size * (page - 1))
    .limit(size)
    .toArray();
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const result = {
    docs: docs,
    totalDocs: totalDocs,
    limit: size,
    page: page,
    totalPages: totalPages,
    hasNextPage: page < totalPages,
    nextPage: nextPage,
    hasPrevPage: page > 1,
    prevPage: prevPage,
  };
  return result;
}
