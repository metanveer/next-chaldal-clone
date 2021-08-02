import dbConnect from "../../../db/dbConnect";
import Location from "../../../models/locationModel";

const locationController = async (req, res) => {
  if (req.method === "GET") {
    await dbConnect();

    if (Object.keys(req.query).length === 0) {
      res.status(400).json({ error: "Query params missing" });
      return;
    }

    try {
      const locations = await Location.find(req.query);
      if (locations.length === 0) {
        res.status(200).json({ message: "Query didn't match any document" });
        return;
      }
      res.status(200).json({ message: "success", data: locations });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Can not retrieve data!" });
    }
  }
};

export default locationController;
