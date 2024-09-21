import { UpdateData, updateDoc } from 'firebase/firestore';
import { getCampaignRef } from './_getRef';
import { CampaignType } from '@/types/campaign.type';

export function updateCampaign(
  campaignId: string,
  campaign: UpdateData<CampaignType>,
) {
  return updateDoc(getCampaignRef(campaignId), campaign);
}
