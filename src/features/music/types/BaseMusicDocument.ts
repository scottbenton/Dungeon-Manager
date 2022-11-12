import { MusicSource } from './MusicSource';

export interface BaseMusicDocument {
  id: string;
  source: MusicSource;
  tags: string[];
}
