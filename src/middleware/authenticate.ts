import { Request, Response, NextFunction } from "express";
import { ResultTokenVerification, verifyToken } from "../utils/auth";

export const ensureBearerToken = (
  req: Request,
  res: Response,
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

  req.body.userId = verificationResult.decoded!.userId;
  next();
};

export default authenticate;
