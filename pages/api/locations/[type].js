import dbConnect from "../../../db/dbConnect";

const locTypeHandler = async (req, res) => {
  if (req.method === "GET") {
    const client = await dbConnect();
    const Location = client.db().collection("locations");
    try {
      if (req.query.type === "divisions") {
        console.log("req query type at type", req.query);
        const locations = await Location.find({
          // division_id: /\d/,
          // district_id: undefined,
          // upazila_id: undefined,
          // union_id: undefined,
          type: "division",
        }).toArray();

        res.status(200).json({
          message: `${locations.length} divisions`,
          data: locations,
        });
        client.close();
        return;
      }
      if (req.query.type === "districts") {
        console.log("req query type at type", req.query);

        if (req.query.division_id) {
          const locations = await Location.find({
            type: "district",
            parent_id: req.query.division_id,
          }).toArray();
          const division = await Location.findOne({
            type: "division",
            id: req.query.division_id,
          });
          res.status(200).json({
            message: `${locations.length} districts(s) in ${division.name} division`,
            data: locations,
          });
          client.close();
          return;
        }

        res.status(400).json({
          error: `No division id entered!`,
        });
        client.close();
        return;
      }

      if (req.query.type === "upazilas") {
        const locations = await Location.countDocuments({
          type: "upazila",
        });

        if (req.query.district_id) {
          const locations = await Location.find({
            type: "upazila",
            parent_id: req.query.district_id,
          }).toArray();
          const district = await Location.findOne({
            type: "district",
            id: req.query.district_id,
          });

          if (!district) {
            res.status(404).json({
              error: `Not found`,
            });
            client.close();
            return;
          }

          res.status(200).json({
            message: `${locations.length} upazila(s) in ${district.name} district`,
            data: locations,
          });
          client.close();
          return;
        }

        res.status(200).json({
          message: `${locations} upazilas. Please specify a district`,
        });
        client.close();
        return;
      }

      if (req.query.type === "unions") {
        if (req.query.upazila_id) {
          const locations = await Location.find({
            type: "union",
            parent_id: req.query.upazila_id,
          }).toArray();
          const upazila = await Location.findOne({
            type: "upazila",
            id: req.query.upazila_id,
          });

          if (!upazila) {
            res.status(404).json({
              error: `Not found`,
            });
            client.close();
            return;
          }

          res.status(200).json({
            message: `${locations.length} unions(s) in ${upazila.name} upazila`,
            data: locations,
          });
          client.close();
          return;
        }

        const locations = await Location.countDocuments({
          type: "union",
        });

        res.status(200).json({
          message: `${locations} unions. Please specify a upazila`,
        });
        client.close();
        return;
      }

      res.status(200).json({ error: "Unsupported query!" });
      client.close();
      return;
    } catch (error) {
      console.log(error);
      client.close();
      res.status(500).json({ error: "Can not retrieve data!" });
    }
  }
};

export default locTypeHandler;
