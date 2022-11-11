import { BaseMusicDocument } from './BaseMusicDocument';
import { MusicSource } from './MusicSource';
import { SpotifyMusicTypes } from './SpotifyMusicTypes';

export interface SpotifyMusicDocument extends BaseMusicDocument {
  source: MusicSource.Spotify;
  type: SpotifyMusicTypes;
}
