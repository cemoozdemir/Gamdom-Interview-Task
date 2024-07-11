import { Request, Response } from "express";

export interface DatabaseError extends Error {
  status: number;
}

export interface JwtError extends Error {
  name: string;
  message: string;
}

const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
};

export default errorHandler;
