import { CampaignType } from '@/types/campaign.type';
import { onSnapshot } from 'firebase/firestore';
import { getCampaignRef } from './_getRef';

export function loadCampaign(
  campaignId: string,
  setCampaign: (campaign: CampaignType) => void,
  onError: (error: string) => void,
): () => void {
  return onSnapshot(getCampaignRef(campaignId), {
    next: (snapshot) => {
      const campaign = snapshot.data();
      if (campaign) {
        setCampaign(campaign as CampaignType);
      } else {
        onError('Campaign not found');
      }
    },
    error: (error) => {
      onError(error.message);
    },
  });
}
