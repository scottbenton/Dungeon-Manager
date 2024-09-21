import { CampaignType } from '@/types/campaign.type';
import { onSnapshot, query, where } from 'firebase/firestore';
import { campaignCollectionRef } from './_getRef';

export function loadCampaigns(
  userId: string,
  setLoaded: () => void,
  setCampaign: (campaignId: string, campaign: CampaignType) => void,
  removeCampaign: (campaignId: string) => void,
  onError: (error: string) => void,
): () => void {
  return onSnapshot(
    query(campaignCollectionRef, where('users', 'array-contains', userId)),
    {
      next: (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'removed') {
            removeCampaign(change.doc.id);
          } else {
            setCampaign(change.doc.id, change.doc.data() as CampaignType);
          }
        });
        if (snapshot.docs.length === 0) {
          setLoaded();
        }
      },
      error: (error) => {
        onError(error.message);
      },
    },
  );
}
