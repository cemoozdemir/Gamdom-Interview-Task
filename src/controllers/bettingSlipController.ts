import { Request, Response } from "express";
import db from "../models/database";

// import * as messages from "./messages";
// error type check
// redis kullan

export async function createBettingSlip(req: Request, res: Response) {
  const { user_id, event_id, amount, winning_team_id } = req.body;
  try {
    const { rows } = await db.query<{ user_id: number; event_id: number }>( //!!!
      "INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [user_id, event_id, amount, winning_team_id]
    );
    res.status(201).json({
      message: "Betting Slip Created Successfully!",
      bettingSlip: rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error occured on creation of betting slip",
      error: err,
    });
  }
}

export async function getBettingSlip(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      "SELECT * FROM betting_slips WHERE id = $1;",
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Entered Betting Slip not found!" });
    }
    res.status(200).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({
      message: "Error occured on retrieving betting slip",
      error: err.message,
    });
  }
}

export async function updateBettingSlip(req: Request, res: Response) {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const { rows } = await db.query(
      "UPDATE betting_slips SET amount = $1 WHERE id = $2 RETURNING *;",
      [amount, id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Entered Betting Slip not found!" });
    }
    res.status(200).json({
      message: "Betting Slip Update Successfully",
      bettingSlip: rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Error occured on updating Betting Slip",
      error: err.message,
    });
  }
}

export async function deleteBettingSlips(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query(
      "DELETE FROM betting_slips WHERE id = $1;",
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Betting Slip not found!" });
    }
    res.status(200).json({ message: "Betting Slip Successfully Deleted" });
  } catch (err: any) {
    res.status(500).json({
      message: "Error occured on deletion of betting slip",
      error: err.message,
    });
  }
}

export async function listBettingSlips(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const rows = await db.query(
      "SELECT * FROM betting_slips WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(500).json({
      message: "Error occured on listing of betting slips",
      error: err.message,
    });
  }
}
