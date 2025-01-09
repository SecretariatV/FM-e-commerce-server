import { model, Schema } from "mongoose";

import { IPart } from "../types";

const partSchema = new Schema<IPart>({
  name: { type: String, required: true },
});

const Part = model<IPart>("Part", partSchema);

export default Part;
