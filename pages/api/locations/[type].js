import dbConnect from "../../../db/dbConnect";

const locTypeHandler = async (req, res) => {
  if (req.method === "GET") {
    const client = await dbConnect();
    const Location = client.db().collection("locations");
    try {
      if (req.query.type === "divisions") {
        const locations = await Location.find({
          division_id: /\d/,
          district_id: undefined,
          upazila_id: undefined,
          union_id: undefined,
        }).toArray();

        res.status(200).json({
          message: `${locations.length} divisions`,
          data: locations,
        });
        client.close();
        return;
      }
      if (req.query.type === "districts") {
        if (req.query.division_id) {
          const locations = await Location.find({
            division_id: req.query.division_id,
            district_id: /\d/,
            upazila_id: undefined,
            union_id: undefined,
          }).toArray();
          const division = await Location.findOne({
            division_id: req.query.division_id,
          });
          res.status(200).json({
            message: `${locations.length} districts(s) in ${division.name} division`,
            data: locations,
          });
          client.close();
          return;
        }

        const locations = await Location.find({
          division_id: /\d/,
          district_id: /\d/,
          upazila_id: undefined,
          union_id: undefined,
        }).toArray();

        res.status(200).json({
          message: `${locations.length} districts`,
          data: locations,
        });
        client.close();
        return;
      }
      if (req.query.type === "upazilas") {
        const locations = await Location.countDocuments({
          division_id: undefined,
          district_id: /\d/,
          upazila_id: /\d/,
          union_id: undefined,
        });

        if (req.query.district_id) {
          const locations = await Location.find({
            division_id: undefined,
            district_id: req.query.district_id,
            upazila_id: /\d/,
            union_id: undefined,
          }).toArray();
          const district = await Location.findOne({
            district_id: req.query.district_id,
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
            division_id: undefined,
            district_id: undefined,
            upazila_id: req.query.upazila_id,
            union_id: /\d/,
          }).toArray();
          const upazila = await Location.findOne({
            upazila_id: req.query.upazila_id,
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
          division_id: undefined,
          district_id: undefined,
          upazila_id: /\d/,
          union_id: /\d/,
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
