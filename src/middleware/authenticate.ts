import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: Token is not provided!" });
    }

    const decoded = verifyToken(token);
    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default authenticate;
