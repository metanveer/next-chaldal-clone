import dbConnect from "../../../db/dbConnect";

const locationController = async (req, res) => {
  if (req.method === "GET") {
    if (Object.keys(req.query).length === 0) {
      res.status(400).json({ error: "Query params missing" });
      return;
    }

    try {
      const client = await dbConnect();
      const Location = client.db().collection("locations");

      const locations = await Location.find(req.query);
      if (locations.length === 0) {
        res.status(200).json({ message: "Query didn't match any document" });
        client.close();
        return;
      }
      res.status(200).json({ message: "success", data: locations });
      client.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Can not retrieve data!" });
      client.close();
    }
  }
};

export default locationController;
