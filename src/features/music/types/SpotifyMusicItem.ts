import { BaseMusicItem } from './BaseMusicItem';
import { MusicSource } from './MusicSource';
import { SpotifyMusicTypes } from './SpotifyMusicTypes';

export interface SpotifyMusicItem extends BaseMusicItem {
  source: MusicSource.Spotify;
  type: SpotifyMusicTypes;
  label?: string;
}
