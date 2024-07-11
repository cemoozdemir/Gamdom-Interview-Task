import express from "express";
import * as BettingSlipController from "../controllers/bettingSlipController";

const router = express.Router();

router.post("/", BettingSlipController.createBettingSlip);
router.get("/:id", BettingSlipController.getBettingSlip);
router.put("/:id", BettingSlipController.updateBettingSlip);
router.delete("/:id", BettingSlipController.deleteBettingSlips);
router.get("/user/:userId", BettingSlipController.listBettingSlips);

export default router;
