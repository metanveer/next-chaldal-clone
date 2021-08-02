import dbConnect from "../../../db/dbConnect";
import Location from "../../../models/locationModel";

const locationController = async (req, res) => {
  console.log(req.query);
  if (req.method === "GET") {
    res.status(400).json({ error: "Bad request" });
  }
  if (req.method === "POST") {
    await dbConnect();
    try {
      const locations = await Location.insertMany(req.body);
      res.status(201).json({ message: "Locations added!", data: locations });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add locations" });
    }
  }
};

export default locationController;
