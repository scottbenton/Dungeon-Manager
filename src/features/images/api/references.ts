import { firestore } from '@/lib/firestore';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { storage } from '@/lib/storage';

import { ImageSetDocument } from '../types/ImageSetDocument';
import { ImageDocument } from '../types/ImageDocument';

const IMAGES_COLLECTION_NAME = 'images';

export const getImageSetRef = (uid: string) =>
  doc(
    firestore,
    IMAGES_COLLECTION_NAME,
    uid
  ) as DocumentReference<ImageSetDocument>;

export const getImageItemRef = (uid: string, docId: string) =>
  doc(
    firestore,
    IMAGES_COLLECTION_NAME,
    uid,
    IMAGES_COLLECTION_NAME,
    docId
  ) as DocumentReference<ImageDocument>;

export const getImageItemCollectionRef = (uid: string) =>
  collection(
    firestore,
    IMAGES_COLLECTION_NAME,
    uid,
    IMAGES_COLLECTION_NAME
  ) as CollectionReference<ImageDocument>;

export const getStorageRef = (uid: string, filename: string) =>
  ref(storage, `${IMAGES_COLLECTION_NAME}/${uid}/${filename}`);
