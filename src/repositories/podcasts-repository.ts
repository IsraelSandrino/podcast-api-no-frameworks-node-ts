import { db } from "../database/connection";
import { PodcastModel } from "../models/podcast-model";

// SELECT
export const repositoryPodcast = (podcastsName?: string): PodcastModel[] => {
  if (podcastsName) {
    return db
      .prepare(
        `
      SELECT * FROM episodes WHERE podcast_id =
      (SELECT id FROM podcasts WHERE name = ?)
    `,
      )
      .all(podcastsName) as PodcastModel[];
  }

  return db.prepare("SELECT * FROM episodes").all() as PodcastModel[];
};

// INSERT
export const repositoryCreateEpisode = (data: PodcastModel): PodcastModel[] => {
  db.prepare(
    `
    INSERT INTO episodes (podcast_id, title, video_id) VALUES (?, ?, ?)
  `,
  ).run(data.podcastName, data.episode, data.videoId);

  return [data];
};

// UPDATE
export const repositoryUpdateEpisode = (data: PodcastModel): PodcastModel[] => {
  db.prepare(
    `
      UPDATE episodes SET title = ?, video_id = ? WHERE id = ?
    `,
  ).run(data.episode, data.videoId, data.id);

  return [data];
};

// DELETE
export const repositoryDeleteEpisode = (id: number): void => {
  db.prepare(
    `
      DELETE FROM episodes WHERE id = ?
    `,
  ).run(id);
};

// PATCH
export const repositoryPatchEpisode = (
  id: number,
  data: Partial<PodcastModel>,
): void => {
  const fields = Object.keys(data);

  if (fields.length === 0) return;

  const columnMap: Record<string, string> = {
    podcastName: "podcast_id",
    episode: "title",
    videoId: "video_id",
  };

  const setClause = fields.map((field) => `${columnMap[field]} = ?`).join(", ");
  const values = fields.map((field) => (data as any)[field]);
  values.push(id);

  db.prepare(
    `
      UPDATE episodes SET ${setClause} WHERE id = ?
    `,
  ).run(...values);
};
