import { storage } from '@/lib/storage';
import { ref, StorageReference } from 'firebase/storage';
import { collection, doc } from 'firebase/firestore';
import { firestore } from '@/lib/firestore';
export function getStorageRef(
  campaignId: string,
  filename: string,
): StorageReference {
  return ref(storage, `campaigns/${campaignId}/${filename}`);
}

export const campaignCollectionRef = collection(firestore, 'campaigns');
export function getCampaignRef(campaignId: string) {
  return doc(campaignCollectionRef, campaignId);
}
