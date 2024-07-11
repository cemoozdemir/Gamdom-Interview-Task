import express from "express";
import * as BettingSlipController from "../controllers/bettingSlipController";
import authenticate, { ensureBearerToken } from "../middleware/authenticate";

const router = express.Router();

router.post(
  "/",
  ensureBearerToken,
  authenticate,
  BettingSlipController.createBettingSlip
);
router.get(
  "/:id",
  ensureBearerToken,
  authenticate,
  BettingSlipController.getBettingSlip
);
router.put(
  "/:id",
  ensureBearerToken,
  authenticate,
  BettingSlipController.updateBettingSlip
);
router.delete(
  "/:id",
  ensureBearerToken,
  authenticate,
  BettingSlipController.deleteBettingSlips
);
router.get(
  "/user/:userId",
  authenticate,
  BettingSlipController.listBettingSlips
);

export default router;
