import { updateDoc } from 'firebase/firestore';
import { getImageItemRef } from './references';

export function updateImageItemDisplayName(
  uid: string,
  id: string,
  newName: string
) {
  updateDoc(getImageItemRef(uid, id), {
    displayName: newName,
  });
}
