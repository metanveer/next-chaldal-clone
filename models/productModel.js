import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ProductVariantId: { type: Number },
  Name: { type: String },
  NameWithoutSubText: { type: String },
  SubText: { type: String },
  ShortDescription: { type: String },
  NameBn: { type: String },
  Price: {
    Lo: { type: Number },
    Mid: { type: Number },
    Hi: { type: Number },
    SignScale: { type: Number },
  },
  DiscountedPrice: {
    Lo: { type: Number },
    Mid: { type: Number },
    Hi: { type: Number },
    SignScale: { type: Number },
  },
  CorporatePrice: {
    Lo: { type: Number },
    Mid: { type: Number },
    Hi: { type: Number },
    SignScale: { type: Number },
  },
  ExpressQuantitiesByWarehouseId: { type: Number },
  RegularQuantitiesByWarehouseId: { type: Number },
  LongDescription: { type: String },
  Slug: { type: String },
  PictureUrls: [{ type: String }],
  OfferPictureUrls: [{ type: String }],
  IsPerishableOrThirdPartyItem: { type: Boolean },
  IsBasicItem: { type: Boolean },
  DoNotApplyDiscounts: { type: Boolean },
  BlockSale: { type: Boolean },
  AllCategoryIds: [{ type: Number }],
  AllRecursiveCategoryIds: [{ type: Number }],
  AllManufacturerIds: [{ type: Number }],
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
