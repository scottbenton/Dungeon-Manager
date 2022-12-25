import { StoreState } from '@/stores/StoreState';
import { onSnapshot } from 'firebase/firestore';
import { BaseMusicDocument } from '../types/BaseMusicDocument';
import { MusicSource } from '../types/MusicSource';
import { getMusicCollectionRef } from './getMusicCollectionRef';

interface MusicItemAttributes<T> {
  uid: string;
  source: MusicSource;
  getState: () => StoreState;
  setMusicItems: (docs: { [id: string]: T }) => void;
  updateMusicItem: (id: string, doc: T) => void;
  deleteMusicItem: (id: string) => void;
  loadImage?: (id: string, doc: T) => void;
}

export function subscribeToMusicItems<T extends BaseMusicDocument>({
  uid,
  source,
  getState,
  setMusicItems,
  updateMusicItem,
  deleteMusicItem,
  loadImage,
}: MusicItemAttributes<T>) {
  return onSnapshot(getMusicCollectionRef<T>(uid, source), (snapshot) => {
    if (Object.keys(getState().music.musicItems[source]).length === 0) {
      const music: { [id: string]: T } = {};

      snapshot.docs.forEach((doc) => {
        music[doc.id] = doc.data();
        loadImage && loadImage(doc.id, doc.data());
      });

      setMusicItems(music);
    } else {
      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case 'added':
            updateMusicItem(change.doc.id, change.doc.data());
            loadImage && loadImage(change.doc.id, change.doc.data());
            break;
          case 'modified':
            updateMusicItem(change.doc.id, change.doc.data());
            break;
          case 'removed':
            deleteMusicItem(change.doc.id);
            break;
          default:
            break;
        }
      });
    }
  });
}
