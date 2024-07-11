import { Request, Response } from "express";
import db from "../models/database";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import { DatabaseError } from "../middleware/errorHandler";

export async function registerUser(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };
  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Username and password should be entered!" });
    return;
  }

  try {
    const hashedPassword = await hashPassword(password);
    await db.query<{ id: number }>(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    res.status(201).json({ message: "User successfully registered" });
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on user registration",
      error: error.message,
    });
  }
}
//type cast similar at line 16 on bettingSlipController
export async function loginUser(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Username and password should be entered!" });
    return;
  }

  try {
    const { rows } = await db.query<{ id: number; password: string }>(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (rows.length > 0) {
      const validPassword = await comparePassword(password, rows[0].password);
      if (validPassword) {
        const token = generateToken(rows[0].id);
        res.json({ token: token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    const error = err as DatabaseError;
    res
      .status(500)
      .json({ message: "Error occured on logging in", error: error.message });
  }
}
