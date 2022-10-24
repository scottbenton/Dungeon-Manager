import { onSnapshot } from 'firebase/firestore';
import { ImageDocument } from '../types/ImageDocument';
import { getImageItemRef } from './references';

export function imageItemListener(
  uid: string,
  itemId: string,
  onData: (data: ImageDocument | undefined) => void,
  onError: (error: string) => void
) {
  return onSnapshot(
    getImageItemRef(uid, itemId),
    (snapshot) => {
      onData(snapshot.data());
    },
    (error) => {
      onError(error.message);
    }
  );
}
