import { Document } from "mongoose";

interface IError extends Error {
  status: number;
}

interface IParts {
  id: string;
  amount: number;
}

interface IProduct extends Document {
  modelName: "headphones" | "speaker" | "earphones";
  modelType: string;
  description: string;
  price: number;
  features: string[];
  banner: string;
  banners: string[];
  parts: IParts[];
}

interface IPart extends Document {
  name: string;
}

interface IUser extends Document {
  name: string;
}

export type { IError, IProduct, IPart, IUser };
