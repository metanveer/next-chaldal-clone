import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
  {
    orderStatus: { type: String },
    createdOn: { type: Date },
    items: [
      {
        qty: { type: Number },
        packSize: { type: String },
        image: { type: String },
        itemName: { type: String },
        discPrice: { type: Number },
        regPrice: { type: Number },
      },
    ],
    totals: {
      subtotal: { type: Number },
      subtotalWithDiscount: { type: Number },
      shippingCharge: { type: Number },
      grandTotal: { type: Number },
    },
    deliveryAddress: {
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
    delivery: {
      status: { type: String },
      updatedAt: { type: Date },
    },
    payment: {
      method: { type: String },
      status: { type: String },
      paidAt: { type: Date },
      paymentDetails: { any: Object },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
