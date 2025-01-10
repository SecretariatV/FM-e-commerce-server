import jwt from "jsonwebtoken";

import { IUser } from "../types";
import { env } from "../config";

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user.id }, env.jwtSecret, { expiresIn: "1d" });
};

export default generateToken;
