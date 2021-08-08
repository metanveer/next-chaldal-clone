import dbConnect from "../../../db/dbConnect";

const locationController = async (req, res) => {
  console.log(req.query);
  if (req.method === "GET") {
    res.status(400).json({ error: "Bad request" });
  }
  if (req.method === "POST") {
    const client = await dbConnect();
    const Location = client.db().collection("locations");
    try {
      const locations = await Location.insertMany(req.body);
      res.status(201).json({ message: "Locations added!", data: locations });
      client.close();
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "failed to add locations" });
      client.close();
    }
  }
};

export default locationController;
