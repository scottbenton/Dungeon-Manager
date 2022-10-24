import { FirestoreError, onSnapshot } from 'firebase/firestore';
import { ImageSetDocument } from '../types/ImageSetDocument';
import { getImageSetRef } from './references';

export function imageSetListener(
  uid: string,
  onData: (data: ImageSetDocument | undefined) => void,
  onError: (error: FirestoreError) => void
) {
  return onSnapshot(getImageSetRef(uid), {
    next: (snapshot) => {
      onData(snapshot.data());
    },
    error: (error) => {
      onError(error);
    },
  });
}
