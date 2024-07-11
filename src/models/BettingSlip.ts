import { BettingSlipInterface } from "../types";
import db from "./database";

class BettingSlip {
  public async create(
    bettingSlip: BettingSlipInterface
  ): Promise<BettingSlipInterface> {
    const { user_id, eventId, amount, winningTeamId } = bettingSlip;
    const query =
      "INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES ($1, $2, $3, $4) RETURNING *;";
    const values = [user_id, eventId, amount, winningTeamId];
    const { rows } = await db.query<BettingSlipInterface>(query, values);
    return rows[0];
  }

  public async findById(id: number): Promise<BettingSlipInterface | null> {
    const query = "SELECT * FROM betting_slips WHERE id = $1;";
    const values = [id];
    const { rows } = await db.query<BettingSlipInterface>(query, values);
    if (rows.length === 0) return null;
    return rows[0];
  }

  public async update(
    id: number,
    amount: number
  ): Promise<BettingSlipInterface> {
    const query =
      "UPDATE betting_slips SET amount = $1 WHERE id = $2 RETURNING *;";
    const values = [amount, id];
    const { rows } = await db.query<BettingSlipInterface>(query, values);
    return rows[0];
  }

  public async delete(id: number): Promise<void> {
    const query = "DELETE FROM betting_slips WHERE id = $1;";
    await db.query(query, [id]);
  }

  public async findAllByUserId(
    userId: number
  ): Promise<BettingSlipInterface[]> {
    const query = "SELECT * FROM betting_slips WHERE user_id = $1;";
    const { rows } = await db.query<BettingSlipInterface>(query, [userId]);
    return rows;
  }
}

export default new BettingSlip();
