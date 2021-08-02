import dbConnect from "../../../../db/dbConnect";
import Location from "../../../../models/locationModel";

const upazilaHandler = async (req, res) => {
  if (req.method === "GET") {
    const upazilaId = req.query.id;

    await dbConnect();

    try {
      if (upazilaId) {
        const upazila = await Location.findOne({ upazila_id: upazilaId });
        if (upazila) {
          res.status(200).json({ message: "success", data: upazila });
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

export default upazilaHandler;
