import { UpdateData, updateDoc } from 'firebase/firestore';
import { getCampaignSettingsRef } from './_getRef';
import { CampaignSettingsType } from '@/types/campaign.type';

export function updateCampaignSettings(
  campaignId: string,
  settings: UpdateData<CampaignSettingsType>,
) {
  return updateDoc(getCampaignSettingsRef(campaignId), settings);
}
