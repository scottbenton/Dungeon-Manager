import { YoutubeMusicTypes } from '../types/YoutubeMusicTypes';

export function parseYoutubeURL(url: string): {
  id: string;
  type: YoutubeMusicTypes;
} | null {
  const parsedUrl = new URL(url);
  const playlistId = parsedUrl.searchParams.get('list');
  const videoId = parsedUrl.searchParams.get('v');
  if (playlistId) {
    return { id: playlistId, type: YoutubeMusicTypes.Playlist };
  }
  if (videoId) {
    return { id: videoId, type: YoutubeMusicTypes.Video };
  }
  return null;
}
