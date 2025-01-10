import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { env, logger } from "../config";
import { IError } from "../types";
import User from "../model/user.model";

interface JwtUserPayload extends JwtPayload {
  id: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { cookies } = req;
  let token;

  console.log("req", req.cookies);

  if (!cookies || !cookies["audi_jwt"]) {
    if (req.headers.authorization) {
      token = req.headers.authorization.split("Bearer ")[1];
    } else {
      logger.error("Authorization denied. No token provided.");
      const error = new Error("Authorization denied.") as IError;
      error.status = 401;
      if (next) return next(error);
    }
  } else {
    token = cookies["audi_jwt"];
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtUserPayload;

    console.log("decoded", decoded);

    if (!decoded.id) {
      logger.error("Invalid token payload.");
      const error = new Error("Invalid token payload") as IError;
      error.status = 401;
      if (next) return next(error);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      const error = new Error("User not found") as IError;
      error.status = 404;
      if (next) return next(error);
    }

    if (user) {
      req.user = user;
      if (next) next();
    } else {
      const error = new Error("User not found") as IError;
      error.status = 404;
      if (next) return next(error);
    }
  } catch (error) {
    if (next) if (next) next(error);
  }
};
