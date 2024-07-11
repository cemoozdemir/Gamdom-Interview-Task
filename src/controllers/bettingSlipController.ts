import { Request, Response } from "express";
import db from "../models/database";
import { DatabaseError } from "../middleware/errorHandler";

export async function createBettingSlip(req: Request, res: Response) {
  const { userId } = req.body;
  const { user_id, event_id, amount, winning_team_id } = req.body;

  if (req.body.user_id !== userId) {
    return res.status(403).json({
      message:
        "Access Denied: You can't create betting slips for other user's account!",
    });
  }
  try {
    const { rows } = await db.query<{ user_id: number; event_id: number }>( //!!!
      "INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [user_id, event_id, amount, winning_team_id]
    );
    res.status(201).json({
      message: "Betting Slip Created Successfully!",
      bettingSlip: rows[0],
    });
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on creation of betting slip",
      error: error.message,
    });
  }
}

export async function getBettingSlip(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rows } = await db.query<{ id: number }>(
      "SELECT * FROM betting_slips WHERE id = $1;",
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Entered Betting Slip not found!" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on retrieving betting slip",
      error: error.message,
    });
  }
}

export async function updateBettingSlip(req: Request, res: Response) {
  const { id } = req.params;
  const { userId, amount } = req.body;

  try {
    const { rows: existingRows } = await db.query<{
      id: number;
      amount: number;
    }>("SELECT * FROM betting_slips WHERE id = $1 AND user_id = $2", [
      id,
      userId,
    ]);
    if (existingRows.length === 0) {
      return res
        .status(403)
        .json({ message: "You can't update another user's betting slip!" });
    }

    const { rows } = await db.query(
      "UPDATE betting_slips SET amount = $1 WHERE id = $2 RETURNING *;",
      [amount, id]
    );

    res.status(200).json({
      message: "Betting Slip Update Successfully",
      bettingSlip: rows[0],
    });
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on updating Betting Slip",
      error: error.message,
    });
  }
}

export async function deleteBettingSlips(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const { rows: existingRows } = await db.query(
      "SELECT * FROM betting_slips WHERE id = $1",
      [id]
    );
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Betting Slip not found!" });
    }

    if (existingRows[0].user_id !== userId) {
      return res
        .status(403)
        .json({ message: "You can't delete another user's betting slip!" });
    }

    await db.query<{ id: number }>("DELETE FROM betting_slips WHERE id = $1;", [
      id,
    ]);

    res.status(200).json({ message: "Betting Slip Successfully Deleted" });
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on deletion of betting slip",
      error: error.message,
    });
  }
}

export async function listBettingSlips(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const rows = await db.query<{ userId: number }>(
      "SELECT * FROM betting_slips WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(rows);
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on listing of betting slips",
      error: error.message,
    });
  }
}
