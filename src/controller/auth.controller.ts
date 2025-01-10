import { NextFunction, Request, Response } from "express";

import User from "../model/user.model";
import { logger } from "../config";
import { IError } from "../types";
import generateToken from "../utils/generateToken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists.") as IError;
      error.status = 400;
      return next(error);
    }

    const user = new User({ name, email });
    await user.save();

    logger.info(`New user created: ${email}.`);
    res.status(201).json({
      message: "User registered. Please verify your email to log in.",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Can't find this user.") as IError;
      error.status = 400;
      return next(error);
    }

    const token = generateToken(user);

    res.cookie("audi_jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000 * 24,
    });

    logger.info(`Login use: ${email}.`);
    res.status(201).json({
      message: "Success login",
    });
  } catch (error) {
    next(error);
  }
};
