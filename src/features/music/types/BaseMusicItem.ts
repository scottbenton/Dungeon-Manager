import { MusicSource } from './MusicSource';

export interface BaseMusicItem {
  id: string;
  source: MusicSource;
  tags: string[];
  imageUrl?: string;
}
