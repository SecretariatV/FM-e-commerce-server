import { model, Schema } from "mongoose";

import { IUser } from "../types";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
