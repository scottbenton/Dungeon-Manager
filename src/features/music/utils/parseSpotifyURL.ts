import { SpotifyMusicTypes } from '../types/SpotifyMusicTypes';

export function parseSpotifyURL(url: string): {
  id: string;
  type: SpotifyMusicTypes;
} | null {
  const parsedUrl = new URL(url);

  const [type, id] = parsedUrl.pathname.split('/').filter((t) => !!t);

  let spotifyItemType: SpotifyMusicTypes;

  if (type && id) {
    if (type === 'playlist') {
      spotifyItemType = SpotifyMusicTypes.Playlist;
    } else if (type === 'album') {
      spotifyItemType = SpotifyMusicTypes.Album;
    } else if (type === 'track') {
      spotifyItemType = SpotifyMusicTypes.Song;
    } else {
      return null;
    }

    return {
      id,
      type: spotifyItemType,
    };
  }

  return null;
}
