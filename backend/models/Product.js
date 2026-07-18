import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      default: "Ümumi",
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
