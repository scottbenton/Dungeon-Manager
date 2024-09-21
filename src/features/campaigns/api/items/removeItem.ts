import { deleteDoc } from 'firebase/firestore';
import { getCampaignItemRef } from './_getRef';
import { ItemTypes } from '@/types/item.type';

export function removeItem(
  campaignId: string,
  itemType: ItemTypes,
  itemId: string,
) {
  return deleteDoc(getCampaignItemRef(campaignId, itemType, itemId));
}
