import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const locationSchema = new mongoose.Schema({
  division_id: { type: String },
  district_id: { type: String },
  upazila_id: { type: String },
  union_id: { type: String },
  name: { type: String },
  bn_name: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  url: { type: String },
});

locationSchema.plugin(mongoosePaginate);

const Location =
  mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;
