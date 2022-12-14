import { deleteField, setDoc } from 'firebase/firestore';
import { getImageSetRef } from './references';

export function selectImage(uid: string, imageId?: string) {
  return setDoc(
    getImageSetRef(uid),
    {
      currentSelectedItem: imageId ?? deleteField(),
    },
    { merge: true }
  );
}
