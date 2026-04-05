import { db } from "../../database/connection";
import {
  CreateEpisodeInput,
  EpisodeEntity,
  PatchEpisodeInput,
  UpdateEpisodeInput,
} from "./episodes.types";

const findEpisodeById = (id: number): EpisodeEntity[] => {
  return db
    .prepare("SELECT * FROM episodes WHERE id = ?")
    .all(id) as EpisodeEntity[];
};
export const repositoryPodcast = (podcastsName?: string): EpisodeEntity[] => {
  if (podcastsName) {
    return db
      .prepare(
        `
      SELECT * FROM episodes WHERE podcast_id =
      (SELECT id FROM podcasts WHERE name = ?)
    `,
      )
      .all(podcastsName) as EpisodeEntity[];
  }

  return db.prepare("SELECT * FROM episodes").all() as EpisodeEntity[];
};
export const repositoryCreateEpisode = (
  data: CreateEpisodeInput,
): EpisodeEntity[] => {
  const result = db
    .prepare(
      `
    INSERT INTO episodes (podcast_id, title, video_id) VALUES (?, ?, ?)
  `,
    )
    .run(data.podcast_id, data.title, data.video_id);

  return findEpisodeById(Number(result.lastInsertRowid));
};
export const repositoryUpdateEpisode = (
  data: UpdateEpisodeInput,
): EpisodeEntity[] => {
  db.prepare(
    `
      UPDATE episodes SET podcast_id = ?, title = ?, video_id = ? WHERE id = ?
    `,
  ).run(data.podcast_id, data.title, data.video_id, data.id);

  return findEpisodeById(data.id);
};
export const repositoryDeleteEpisode = (id: number): void => {
  db.prepare(
    `
      DELETE FROM episodes WHERE id = ?
    `,
  ).run(id);
};
export const repositoryPatchEpisode = (
  id: number,
  data: PatchEpisodeInput,
): void => {
  const fields = Object.keys(data) as (keyof PatchEpisodeInput)[];

  if (fields.length === 0) return;

  // Mapeia e limita os campos permitidos no PATCH para colunas reais da tabela, evitando atualizacoes fora do contrato.
  const columnMap: Record<keyof PatchEpisodeInput, string> = {
    podcast_id: "podcast_id",
    title: "title",
    video_id: "video_id",
  };

  const setClause = fields.map((field) => `${columnMap[field]} = ?`).join(", ");
  const values = fields.map((field) => data[field]);
  values.push(id);

  db.prepare(
    `
      UPDATE episodes SET ${setClause} WHERE id = ?
    `,
  ).run(...values);
};
