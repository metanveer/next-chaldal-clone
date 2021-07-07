import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  Id: { type: Number },
  Name: { type: String },
  ParentCategoryId: { type: Number },
  DisplayOrder: { type: Number },
  slug: { type: String },
  Picture: {
    Id: { type: Number },
    MimeType: { type: String },
    SeoFilename: { type: String },
    ImageUrl: { type: String },
    PictureBinary: { type: String },
    CompressionQuality: { type: Number },
  },
  ContainsProducts: { type: Boolean },
  Banners: [
    {
      BannerUrl: { type: String },
      OnClickLink: { type: String },
      Tag: { type: String },
    },
  ],
  BackgroundUrl: { type: String },
  CategoryType: { type: String },
  NameBn: { type: String },
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
