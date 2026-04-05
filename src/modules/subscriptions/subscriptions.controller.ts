import { IncomingMessage, ServerResponse } from "http";
import {
  getAuthenticatedUserId,
  getRequiredRouteNumberParam,
} from "../../utils/request-params";
import { sendJson } from "../../shared/http/send-json";
import { sendNoContent } from "../../shared/http/send-no-content";
import { AuthenticatedRequest } from "../../types/authenticated-request";
import { RoutedRequest } from "../../types/routed-request";
import {
  serviceListSubscriptions,
  serviceSubscribe,
  serviceUnsubscribe,
} from "./subscriptions.service";
import { SubscriptionTransferModel } from "./subscriptions.types";

type SubscriptionRequest = IncomingMessage & RoutedRequest & AuthenticatedRequest;
export const subscribePodcast = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const subscriptionRequest = request as SubscriptionRequest;
  const podcastId = getRequiredRouteNumberParam(subscriptionRequest, "podcastId");
  const userId = getAuthenticatedUserId(subscriptionRequest);

  const content: SubscriptionTransferModel = serviceSubscribe(userId, podcastId);

  sendJson(response, content.statusCode, content.body);
};
export const unsubscribePodcast = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const subscriptionRequest = request as SubscriptionRequest;
  const podcastId = getRequiredRouteNumberParam(subscriptionRequest, "podcastId");
  const userId = getAuthenticatedUserId(subscriptionRequest);

  serviceUnsubscribe(userId, podcastId);

  sendNoContent(response);
};
export const listSubscriptionsPodcast = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const subscriptionRequest = request as SubscriptionRequest;
  const userId = getAuthenticatedUserId(subscriptionRequest);

  const content: SubscriptionTransferModel = serviceListSubscriptions(userId);

  sendJson(response, content.statusCode, content.body);
};
