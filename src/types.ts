export interface BettingSlipInterface {
  id?: number;
  user_id: number;
  eventId: number;
  amount: number;
  winningTeamId: number;
  timestamp?: Date;
}

export interface DecodedToken {
  userId: number;
  iat: number;
  exp: number;
}

export interface ResultTokenVerification {
  valid: boolean;
  decoded?: DecodedToken;
  error?: string;
}
