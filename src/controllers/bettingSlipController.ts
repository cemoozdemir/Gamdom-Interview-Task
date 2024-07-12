import { Request, Response } from "express";
import { DatabaseError } from "../middleware/errorHandler";
import { BettingSlipInterface } from "../types";
import BettingSlip from "../models/BettingSlip";

export async function createBettingSlip(
  req: Request,
  res: Response
): Promise<void> {
  const { id: userId } = res.locals.user;
  const { eventId, amount, winningTeamId } = req.body as {
    eventId: number;
    amount: number;
    winningTeamId: number;
  };

  console.log("req.body:", req.body);
  console.log("userId:", userId);
  console.log("eventId:", eventId);
  console.log("amount:", amount);
  console.log("winningTeamId:", winningTeamId);

  if (res.locals.user.id !== userId) {
    res.status(403).json({
      message:
        "Access Denied: You can't create betting slips for other user's account!",
    });
    return;
  }
  try {
    const bettingSlip: BettingSlipInterface = {
      userId,
      eventId,
      amount,
      winningTeamId,
    };
    console.log("bettingSlip:", bettingSlip);
    const createdBettingSlip = await BettingSlip.create(bettingSlip);
    res.status(201).json({
      message: "Betting Slip Created!",
      bettingSlip: createdBettingSlip,
    });
  } catch (err) {
    const error = err as DatabaseError;
    console.log(error);
    res.status(500).json({
      message: "Error occured on creation of betting slip",
      error: error.message,
    });
  }
}

export async function getBettingSlip(
  req: Request,
  res: Response
): Promise<void> {
  const { id: userId } = res.locals.user;
  const { id } = req.params;
  try {
    const bettingSlip = await BettingSlip.findById(Number(id));
    if (!bettingSlip || bettingSlip?.userId !== Number(userId)) {
      res.status(404).json({ message: "Requested Betting Slip not found!" });
      return;
    }
    res.status(200).json(bettingSlip);
    return;
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on retrieving betting slip",
      error: error.message,
    });
  }
}

export async function updateBettingSlip(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { amount } = req.body as { amount?: number };
  const { id: userId } = res.locals.user;

  try {
    const bettingSlip = await BettingSlip.findById(Number(id));
    if (!bettingSlip || bettingSlip.userId !== userId) {
      res.status(404).json({ message: "Betting Slip not found!" });
      return;
    }

    if (amount === null || amount === undefined) {
      res.status(400).json({
        message: "Amount field is missing",
      });
      return;
    } else if (amount <= 0) {
      res.status(400).json({
        message: "Amount parameter can't be 0 or negative value",
      });
      return;
    }

    const updatedBettingSlip = await BettingSlip.update(Number(id), amount);

    res.status(200).json({
      message: "Betting Slip Updated",
      bettingSlip: updatedBettingSlip,
    });
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "An error occured on updating Betting Slip",
      error: error.message,
    });
  }
}

export async function deleteBettingSlips(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const { id: userId } = res.locals.user;

  try {
    const bettingSlip = await BettingSlip.findById(Number(id));
    if (!bettingSlip || bettingSlip.userId !== userId) {
      res.status(404).json({ message: "Betting Slip not found!" });
      return;
    }

    await BettingSlip.delete(Number(id));
    res.status(200).json({ message: "Betting Slip Deleted Successfully" });
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on deletion of betting slip",
      error: error.message,
    });
  }
}

export async function listBettingSlips(
  _req: Request,
  res: Response
): Promise<void> {
  const { id: userId } = res.locals.user;

  try {
    const bettingSlips = await BettingSlip.findAllByUserId(Number(userId));
    if (bettingSlips.length === 0) {
      res.status(404).json({ meesage: "No betting slips found!" });
      return;
    }

    res.status(200).json(bettingSlips);
    return;
  } catch (err) {
    const error = err as DatabaseError;
    res.status(500).json({
      message: "Error occured on listing of betting slips",
      error: error.message,
    });
  }
}
