import dbConnect from "../../../../db/dbConnect";
import Location from "../../../../models/locationModel";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const id = req.query.id;

    await dbConnect();

    try {
      if (id) {
        const data = await Location.findOne({ union_id: id });
        if (data) {
          res.status(200).json({ message: "success", data: data });
          return;
        }
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.status(422).json({ error: "Unable to process" });
      return;
    } catch (error) {
      res.status(500).json({ error: "Can't retrieve data" });
      return;
    }
  }
};

export default handler;
