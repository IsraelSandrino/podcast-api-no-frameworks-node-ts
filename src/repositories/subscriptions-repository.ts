import { db } from "../database/connection";
import { SubscriptionModel } from "../models/subscription-model";

export const repositorySubscribe = (
  user_id: number,
  podcast_id: number,
): SubscriptionModel[] => {
  db.prepare(
    `
    INSERT INTO subscriptions (user_id, podcast_id) VALUES (?, ?)
  `,
  ).run(user_id, podcast_id);

  return db
    .prepare("SELECT * FROM subscriptions WHERE user_id = ? AND podcast_id = ?")
    .all(user_id, podcast_id) as SubscriptionModel[];
};

export const repositoryUnsubscribe = (
  user_id: number,
  podcast_id: number,
): void => {
  db.prepare(
    `
    DELETE FROM subscriptions WHERE user_id = ? AND podcast_id = ?
  `,
  ).run(user_id, podcast_id);
};

// Retorna todos os podcasts que o usuário segue
export const repositoryListSubscriptions = (
  user_id: number,
): SubscriptionModel[] => {
  return db
    .prepare(
      `
    SELECT * FROM subscriptions WHERE user_id = ?
  `,
    )
    .all(user_id) as SubscriptionModel[];
};
