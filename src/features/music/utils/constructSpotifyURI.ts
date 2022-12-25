import { SpotifyMusicTypes } from '../types/SpotifyMusicTypes';

export function constructSpotifyURI(
  type: SpotifyMusicTypes,
  id: string
): string {
  switch (type) {
    case SpotifyMusicTypes.Playlist:
      return `spotify:playlist:${id}`;
    case SpotifyMusicTypes.Album:
      return `spotify:album:${id}`;
    case SpotifyMusicTypes.Song:
      return `spotify:track:${id}`;
  }
}
