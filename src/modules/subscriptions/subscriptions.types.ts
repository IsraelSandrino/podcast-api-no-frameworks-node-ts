export interface SubscriptionModel {
  id: number;
  user_id: number;
  podcast_id: number;
  created_at: string;
}

export interface SubscriptionTransferModel {
  statusCode: number;
  body: SubscriptionModel[];
}
