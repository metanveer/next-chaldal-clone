import dbConnect from "../../../../db/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id;

    const client = await dbConnect();
    const Location = client.db().collection("locations");

    try {
      if (id) {
        const data = await Location.findOne({ district_id: id });
        if (data) {
          res.status(200).json({ message: "success", data: data });
          client.close();
          return;
        }
        res.status(404).json({ error: "Not found" });
        client.close();
        return;
      }
      res.status(422).json({ error: "Unable to process" });
      client.close();
      return;
    } catch (error) {
      res.status(500).json({ error: "Can't retrieve data" });
      client.close();
      return;
    }
  }
};

export default handler;
