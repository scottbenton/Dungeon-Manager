import { BaseMusicItem } from './BaseMusicItem';
import { MusicSource } from './MusicSource';
import { YoutubeMusicTypes } from './YoutubeMusicTypes';

export interface YoutubeMusicItem extends BaseMusicItem {
  source: MusicSource.Youtube;
  type: YoutubeMusicTypes;
  label: string;
}
