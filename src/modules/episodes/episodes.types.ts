export interface EpisodeEntity {
  id: number;
  podcast_id: number;
  title: string;
  video_id: string;
  created_at: string;
}

export interface CreateEpisodeInput {
  podcast_id: number;
  title: string;
  video_id: string;
}

export interface UpdateEpisodeInput {
  id: number;
  podcast_id: number;
  title: string;
  video_id: string;
}

export interface EpisodeOutput {
  id: number;
  podcast_id: number;
  title: string;
  video_id: string;
  created_at?: string;
  date?: string;
}

export type PatchEpisodeInput = Partial<
  Pick<UpdateEpisodeInput, "podcast_id" | "title" | "video_id">
>;

export interface PodcastTransferModel {
  statusCode: number;
  body: EpisodeOutput[];
}
