import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtError } from "../middleware/errorHandler";

//put these into types.ts file
export interface DecodedToken {
  userId: number;
  iat: number;
  exp: number;
}

export interface ResultTokenVerification {
  valid: boolean;
  decoded?: DecodedToken;
  error?: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export const verifyToken = (token: string): ResultTokenVerification => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return { valid: true, decoded };
  } catch (err) {
    const jwtError = err as JwtError;
    return {
      valid: false,
      error: "Token verification failed: " + jwtError.message,
    };
  }
};
