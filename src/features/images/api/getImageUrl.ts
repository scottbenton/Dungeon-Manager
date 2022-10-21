import { getDownloadURL } from 'firebase/storage';
import { getStorageRef } from './references';

export function getImageUrl(uid: string, filename: string) {
  return getDownloadURL(getStorageRef(uid, filename));
}
