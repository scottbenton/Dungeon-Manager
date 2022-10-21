import { arrayRemove, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import { ImageItem } from '../types/ImageItem';
import { ImageSetDocument } from '../types/ImageSetDocument';
import { getImageItemRef, getImageSetRef, getStorageRef } from './references';

export function deleteImageItem(uid: string, image: ImageItem) {
  updateDoc<ImageSetDocument>(getImageSetRef(uid), {
    itemIds: arrayRemove(image.id),
  }).then(() => {
    deleteDoc(getImageItemRef(uid, image.id)).then(() => {
      deleteObject(getStorageRef(uid, image.filename));
    });
  });
}
