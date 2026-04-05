export interface AnalyticsTransferModel {
  statusCode: number;
  body: object | object[];
}

export interface PlayModel {
  id: number;
  episode_id: number;
  user_id: number;
  played_at: string;
}
