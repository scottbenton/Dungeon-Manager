import { CampaignSettingsType } from '@/types/campaign.type';
import { onSnapshot } from 'firebase/firestore';
import { getCampaignSettingsRef } from './_getRef';

export function loadCampaignSettings(
  campaignId: string,
  onSettings: (settings: CampaignSettingsType) => void,
  onError: (error: string) => void,
) {
  return onSnapshot(
    getCampaignSettingsRef(campaignId),
    (snapshot) => {
      const data = snapshot.data();
      if (data) {
        onSettings(data);
      }
    },
    (error) => {
      console.error(error);
      onError('Failed to load campaign settings');
    },
  );
}
