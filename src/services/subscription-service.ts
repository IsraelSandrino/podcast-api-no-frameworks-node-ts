import { SubscriptionTransferModel } from "../models/subscription-transfer-model";
import {
  repositoryListSubscriptions,
  repositorySubscribe,
  repositoryUnsubscribe,
} from "../repositories/subscriptions-repository";
import { StatusCode } from "../utils/status-code";

export const serviceSubscribe = (
  user_id: number,
  podcast_id: number,
): SubscriptionTransferModel => {
  const result = repositorySubscribe(user_id, podcast_id);

  return {
    statusCode: StatusCode.CREATED,
    body: result,
  };
};

export const serviceUnsubscribe = (
  user_id: number,
  podcast_id: number,
): SubscriptionTransferModel => {
  repositoryUnsubscribe(user_id, podcast_id);

  return {
    statusCode: StatusCode.NO_CONTENT,
    body: [],
  };
};

export const serviceListSubscriptions = (
  user_id: number,
): SubscriptionTransferModel => {
  const subscriptions = repositoryListSubscriptions(user_id);

  return {
    statusCode: StatusCode.OK,
    body: subscriptions,
  };
};
