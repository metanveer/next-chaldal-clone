import mongoose from "mongoose";

// import orderModel from './orderModel'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 4, maxLength: 40 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 6,
      maxLength: 60,
    },
    password: { type: String, required: true, minLength: 6 },
    isAdmin: {
      type: Boolean,
      default: false,
    },
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
