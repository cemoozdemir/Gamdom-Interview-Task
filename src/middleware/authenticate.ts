import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { ResultTokenVerification } from "../types";

export const ensureBearerToken = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  let token = req.headers.authorization;

  if (token && !token.startsWith("Bearer ")) {
    token = `Bearer ${token}`;
    req.headers.authorization = token;
  }

  next();
};

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access Denied: Token is not provided!" });
    return;
  }

  const verificationResult: ResultTokenVerification = verifyToken(token);
  if (!verificationResult.valid) {
    res.status(401).json({ message: verificationResult.error });
    return;
  }

  res.locals.user = { id: verificationResult.decoded!.userId };
  next();
};

export default authenticate;
