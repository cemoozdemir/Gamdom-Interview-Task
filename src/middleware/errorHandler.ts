import { NextFunction, Request, Response } from "express";

export interface DatabaseError extends Error {
  status: number;
}

export interface JwtError extends Error {
  name: string;
  message: string;
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
};

export default errorHandler;
