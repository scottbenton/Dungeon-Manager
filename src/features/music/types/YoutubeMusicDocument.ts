import { BaseMusicDocument } from './BaseMusicDocument';
import { MusicSource } from './MusicSource';
import { YoutubeMusicTypes } from './YoutubeMusicTypes';

export interface YoutubeMusicDocument extends BaseMusicDocument {
  source: MusicSource.Youtube;
  label: string;
  type: YoutubeMusicTypes;
}
