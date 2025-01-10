import { NextFunction, Request, Response } from "express";
import Part from "../model/part.model";
import { IError } from "../types";
import { logger } from "../config";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const existingPart = await Part.findOne({ name });

    if (existingPart) {
      const error = new Error("Part already exist") as IError;
      error.status = 400;
      return next(error);
    }

    const part = new Part({ name });
    await part.save();

    logger.info(`Create new part: ${name}.`);

    res.status(201).json({
      message: "New part created",
    });
  } catch (error) {
    next(error);
  }
};
