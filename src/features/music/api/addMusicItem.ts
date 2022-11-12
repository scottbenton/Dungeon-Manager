import { addDoc } from 'firebase/firestore';
import { BaseMusicDocument } from '../types/BaseMusicDocument';
import { MusicSource } from '../types/MusicSource';
import { getMusicCollectionRef } from './getMusicCollectionRef';

export function addMusicItem<T extends BaseMusicDocument>(
  uid: string,
  source: MusicSource,
  item: T
) {
  return addDoc(getMusicCollectionRef(uid, source), item);
}
