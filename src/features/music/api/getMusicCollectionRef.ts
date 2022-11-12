import { firestore } from '@/lib/firestore';
import { collection, CollectionReference } from 'firebase/firestore';
import { BaseMusicDocument } from '../types/BaseMusicDocument';
import { MusicSource } from '../types/MusicSource';

export function getMusicCollectionRef<T extends BaseMusicDocument>(
  uid: string,
  source: MusicSource
) {
  return collection(firestore, 'music', uid, source) as CollectionReference<T>;
}
