import { model, Schema, Types } from "mongoose";

import { IProduct } from "../types";

const productSchema = new Schema<IProduct>({
  modelName: {
    type: String,
    enum: ["headphones", "speaker", "earphones"],
    required: true,
  },
  modelType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  features: {
    type: [String],
    default: [],
  },
  banner: {
    type: String,
    required: true,
  },
  banners: {
    type: [String],
    default: [],
  },
  parts: [
    {
      id: {
        type: Types.ObjectId,
        ref: "Part",
        required: true,
      },
      amount: {
        type: Number,
        min: 1,
      },
    },
  ],
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
