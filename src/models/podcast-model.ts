export interface PodcastModel {
  id: number;
  podcastName: string; // Nome do Podcast: Flow Podcast, Mamilos, NerdCast ...
  episode: string; // Nome do episódio do podcast
  videoId: string;
  categories: string[];
  date: string;
}
