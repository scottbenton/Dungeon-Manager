import { itemCollectionRef } from './_getRef';
import { addDoc } from 'firebase/firestore';
import { ItemType, ItemTypes } from '@/types/item.type';

export async function createItem(
  campaignId: string,
  itemType: ItemTypes,
  item: ItemType,
): Promise<string> {
  return (await addDoc(itemCollectionRef(campaignId, itemType), item)).id;
}
