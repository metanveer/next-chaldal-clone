import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI_LOCAL;

const dbConnect = async () => {
  const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
  return client;
};

export default dbConnect;
