import mongoose from "mongoose";

// import orderModel from './orderModel'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 4, maxLength: 40 },
    role: { type: String, minLength: 4, maxLength: 40, default: "customer" },
    authProvider: { type: String, minLength: 4, maxLength: 40 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 6,
      maxLength: 60,
    },
    phone: {
      type: String,
      minLength: 11,
      maxLength: 14,
    },
    gender: { type: String, maxLength: 15 },
    password: { type: String, minLength: 6 },
    addresses: [
      {
        name: { type: String, minLength: 4, maxLength: 40 },
        phone: {
          type: String,
          minLength: 11,
          maxLength: 14,
        },
        division: {
          value: { type: Number, minLength: 1, maxLength: 40 },
          label: { type: String, minLength: 1, maxLength: 40 },
        },
        district: {
          value: { type: Number, minLength: 1, maxLength: 40 },
          label: { type: String, minLength: 1, maxLength: 40 },
        },
        upazila: {
          value: { type: Number, minLength: 1, maxLength: 40 },
          label: { type: String, minLength: 1, maxLength: 40 },
        },
        union: {
          value: { type: Number, minLength: 1, maxLength: 40 },
          label: { type: String, minLength: 1, maxLength: 40 },
        },
        address: { type: String, minLength: 4, maxLength: 150 },
      },
    ],
  },
  { timestamp: true }
);

// userSchema.pre("remove", async function (next) {
//   const user = this;
//   await Order.deleteMany({ creator: user._id });
//   next();
// });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
