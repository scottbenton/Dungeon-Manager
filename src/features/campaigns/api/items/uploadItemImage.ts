import { ItemTypes } from '@/types/item.type';
import { uploadBytes } from 'firebase/storage';
import { getStorageRef } from '../_getRef';
import { updateItem } from './updateItem';

export async function uploadItemImage(
  campaignId: string,
  itemType: ItemTypes,
  itemId: string,
  image: File | undefined,
) {
  if (image) {
    await uploadBytes(getStorageRef(campaignId, image.name), image);
  }
  await updateItem(campaignId, itemId, itemType, {
    imageFilename: image?.name ?? null,
  });
}
