import { spotifyApi } from '../lib/spotifyApi';
import { SpotifyMusicDocument } from '../types/SpotifyMusicDocument';
import { SpotifyMusicTypes } from '../types/SpotifyMusicTypes';

export function getSpotifyItemDetails(item: SpotifyMusicDocument): Promise<{
  label: string;
  url: string;
}> {
  return new Promise((resolve, reject) => {
    switch (item.type) {
      case SpotifyMusicTypes.Playlist:
        spotifyApi.get(`/playlists/${item.id}`).then((response) => {
          if (response.data && response.data.name) {
            resolve({
              label: response.data.name,
              url: response.data.images[0]?.url,
            });
          }
          reject(new Error(`No data: ${response.status}`));
        });
        break;
      case SpotifyMusicTypes.Album:
        spotifyApi.get(`/albums/${item.id}`).then((response) => {
          if (response.data && response.data.name) {
            resolve({
              label: response.data.name,
              url: response.data.images[0]?.url,
            });
          }
          reject(new Error(`No data: ${response.status}`));
        });
        break;
      case SpotifyMusicTypes.Song:
        spotifyApi.get(`/tracks/${item.id}`).then((response) => {
          if (response.data && response.data.name) {
            resolve({
              label: response.data.name,
              url: response.data.images[0]?.url,
            });
          }
          reject(new Error(`No data: ${response.status}`));
        });
        break;
      default:
        reject(new Error(`Invalid Type: ${item.type}`));
    }
    reject(new Error('Failed to get item details'));
  });
}
