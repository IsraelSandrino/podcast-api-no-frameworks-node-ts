import { db } from "../../database/connection";
import { PlayModel } from "./analytics.types";

export const repositoryRegisterPlay = (
  user_id?: number,
  episode_id?: number,
): PlayModel => {
  const query = `
    INSERT INTO plays (episode_id, user_id) VALUES (?, ?)
  `;

  db.prepare(query).run(episode_id, user_id ?? null);

  return {
    id: 0,
    episode_id: episode_id ?? 0,
    user_id: user_id ?? 0,
    played_at: new Date().toISOString(),
  };
};

export const repositoryEpisodeAnalytics = (episode_id: number): object[] => {
  const query = `
    WITH RECURSIVE dias_recentes(data) AS (
      SELECT date('now', '-6 days')
      UNION ALL
      SELECT date(data, '+1 day') FROM dias_recentes WHERE data < date('now')
    )
    SELECT 
      d.data,
      COUNT(p.id) AS plays_no_dia,
      (SELECT COUNT(*) FROM plays WHERE episode_id = :ep_id) AS total_plays_historico
    FROM dias_recentes d
    LEFT JOIN plays p ON date(p.played_at) = d.data AND p.episode_id = :ep_id
    GROUP BY d.data
    ORDER BY d.data DESC;
  `;

  return db.prepare(query).all({ ep_id: episode_id }) as object[];
};

export const repositoryPodcastAnalytics = (
  podcastName: string,
): object | undefined => {
  const query = `
      SELECT 
      (SELECT COUNT(pl.id) 
       FROM plays pl
       JOIN episodes e ON pl.episode_id = e.id
       JOIN podcasts p ON e.podcast_id = p.id
       WHERE p.name = :name) AS total_plays,
      (SELECT e.title 
       FROM episodes e
       JOIN podcasts p ON e.podcast_id = p.id
       LEFT JOIN plays pl ON e.id = pl.episode_id
       WHERE p.name = :name
       GROUP BY e.id
       ORDER BY COUNT(pl.id) DESC
       LIMIT 1) AS top_episode,
      (SELECT COUNT(pl.id) || ' plays nesta semana'
       FROM plays pl
       JOIN episodes e ON pl.episode_id = e.id
       JOIN podcasts p ON e.podcast_id = p.id
       WHERE p.name = :name AND strftime('%Y-%W', pl.played_at) = strftime('%Y-%W', 'now')) AS current_week_plays
    `;

  return db.prepare(query).get({ name: podcastName }) as object | undefined;
};
