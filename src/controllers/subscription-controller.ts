import { IncomingMessage, ServerResponse } from "http";
import { extractUrlParam } from "../utils/url-params";
import { Routes } from "../routes/routes";
import { SubscriptionTransferModel } from "../models/subscription-transfer-model";
import {
  serviceListSubscriptions,
  serviceSubscribe,
  serviceUnsubscribe,
} from "../services/subscription-service";
import { ContentType } from "../utils/content-type";

const defaultContent = { "Content-Type": ContentType.JSON };

// POST /api/subscriptions/:podcast_id
export const subscribePodcast = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcast_id = extractUrlParam(request.url, Routes.SUBSCRIPTIONS);
  const user_id = (request as any).user.id;

  const content: SubscriptionTransferModel = serviceSubscribe(
    user_id,
    Number(podcast_id),
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// DELETE /api/subscriptions/:podcast_id
export const unsubscribePodcast = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const podcast_id = Number(extractUrlParam(request.url, Routes.SUBSCRIPTIONS));
  const user_id = (request as any).user.id;

  const content: SubscriptionTransferModel = serviceUnsubscribe(
    user_id,
    podcast_id,
  );

  response.writeHead(content.statusCode, defaultContent);
  response.write(JSON.stringify(content.body));

  response.end();
};

// GET /api/subscriptions
export const listSubscriptionsPodcast = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  const user_id = (request as any).user.id;

  const content: SubscriptionTransferModel = serviceListSubscriptions(user_id);

  response.writeHead(content.statusCode);
  response.write(JSON.stringify(content.body));

  response.end();
};
