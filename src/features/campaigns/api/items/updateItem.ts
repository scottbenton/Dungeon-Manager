import { ItemType, ItemTypes } from '@/types/item.type';
import { UpdateData, updateDoc } from 'firebase/firestore';
import { getCampaignItemRef } from './_getRef';

export function updateItem(
  campaignId: string,
  itemId: string,
  itemType: ItemTypes,
  item: UpdateData<ItemType>,
) {
  return updateDoc(getCampaignItemRef(campaignId, itemType, itemId), item);
}
