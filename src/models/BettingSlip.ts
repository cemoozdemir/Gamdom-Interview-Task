import db from "./database";

//This interface and for the others, create types.ts file to store and use
interface BettingSlipInterface {
  id?: number;
  userId: number;
  eventId: number;
  amount: number;
  winningTeamId: number;
  timestamp?: Date;
}
//type cast these
class BettingSlip {
  public async create(
    //bettingSlipController should call this method. Add these.
    bettingSlip: BettingSlipInterface
  ): Promise<BettingSlipInterface> {
    const { userId, eventId, amount, winningTeamId } = bettingSlip;
    const query =
      "INSERT INTO betting_slips (user_id, event_id, amount, winning_team_id) VALUES ($1, $2, $3, $4) RETURNING *;";
    const values = [userId, eventId, amount, winningTeamId];
    const { rows } = await db.query(query, values); //Add type casting.
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
