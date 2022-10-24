import { addDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';
import { ImageDocument } from '../types/ImageDocument';
import { ImageSetDocument } from '../types/ImageSetDocument';
import {
  getImageItemCollectionRef,
  getImageSetRef,
  getStorageRef,
} from './references';

function getFriendlyFilename(filename: string) {
  const lastIdx = filename.lastIndexOf('.');

  return lastIdx > 0 ? filename.substring(0, lastIdx) : filename;
}

export function createImageItem(uid: string, file: File) {
  uploadBytes(getStorageRef(uid, file.name), file).then((snapshot) => {
    const newImage: ImageDocument = {
      filename: snapshot.ref.name,
      displayName: getFriendlyFilename(file.name),
    };
    addDoc<ImageDocument>(getImageItemCollectionRef(uid), newImage).then(
      (doc) => {
        setDoc<ImageSetDocument>(
          getImageSetRef(uid),
          {
            itemIds: arrayUnion(doc.id),
          },
          { merge: true }
        );
      }
    );
  });
}
