import db from "./database";

interface BettingSlipInterface {
  id?: number;
  userId: number;
  eventId: number;
  amount: number;
  winningTeamId: number;
  timestamp?: Date;
}

class BettingSlip {
  public async create(
    bettingSlip: BettingSlipInterface
  ): Promise<BettingSlipInterface> {
    const { userId, eventId, amount, winningTeamId } = bettingSlip;
    const query =
      "INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES ($1, $2, $3, $4) RETURNING *;";
    const values = [userId, eventId, amount, winningTeamId];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  public async findById(id: number): Promise<BettingSlipInterface | null> {
    const query = "SELECT * FROM betting_slips WHERE id = $1;";
    const values = [id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) return null;
    return rows[0];
  }
}

export default new BettingSlip();
