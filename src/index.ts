import express from "express";
import bettingSlipRoutes from "./routes/bettingSlipRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import authenticate, { ensureBearerToken } from "./middleware/authenticate";

const app = express();

app.use(express.json());

app.use(ensureBearerToken);

app.use("/api/users", userRoutes);

app.use("/api/betting-slips", authenticate, bettingSlipRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Betting Slip API!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
