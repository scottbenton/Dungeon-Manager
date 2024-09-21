import { collection, doc } from 'firebase/firestore';
import { firestore } from '@/lib/firestore';
import { ItemTypes } from '@/types/item.type';

export function itemCollectionRef(campaignId: string, itemType: ItemTypes) {
  return collection(firestore, `campaigns/${campaignId}/${itemType}`);
}

export function getCampaignItemRef(
  campaignId: string,
  itemType: ItemTypes,
  itemId: string,
) {
  return doc(itemCollectionRef(campaignId, itemType), itemId);
}
