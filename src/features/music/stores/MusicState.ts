import { MusicSource } from '../types/MusicSource';
import { PlaybackStatus } from '../types/PlaybackStatus';
import { SpotifyMusicItem } from '../types/SpotifyMusicItem';
import { YoutubeMusicItem } from '../types/YoutubeMusicItem';

export interface MusicState {
  musicItems: {
    [MusicSource.Spotify]: {
      [key: string]: SpotifyMusicItem;
    };
    [MusicSource.Youtube]: {
      [key: string]: YoutubeMusicItem;
    };
  };
  tags: { [tag: string]: string };
  isLoading: boolean;
  error?: string;
  playbackState: {
    item?: SpotifyMusicItem | YoutubeMusicItem;
    status: PlaybackStatus;
  };
  spotifyAuth: {
    isLoading: boolean;
    refreshToken?: string;
    accessToken?: string;
    errorMessage?: string;
  };
}
