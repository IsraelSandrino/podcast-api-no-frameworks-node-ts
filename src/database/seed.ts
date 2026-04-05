import { db } from "./connection";
import data from "./podcasts.json";

const insertPodcast = db.prepare(
  "INSERT OR IGNORE INTO podcasts (name) VALUES (?)",
);

const insertEpisode = db.prepare(
  "INSERT INTO episodes (podcast_id, title, video_id) VALUES (?, ?, ?)",
);

for (const item of data) {
  insertPodcast.run(item.podcastName);

  const podcast = db
    .prepare("SELECT id FROM podcasts WHERE name = ?")
    .get(item.podcastName) as { id: number };

  insertEpisode.run(podcast.id, item.episode, item.videoId);
}

console.log("Dados inseridos com sucesso!");
