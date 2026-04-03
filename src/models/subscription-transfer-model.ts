import { SubscriptionModel } from "./subscription-model";

export interface SubscriptionTransferModel {
  statusCode: number;
  body: SubscriptionModel[];
}
