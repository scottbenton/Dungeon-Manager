import { doc } from 'firebase/firestore';
import { firestore } from '@/lib/firestore';

export function getCampaignSettingsRef(campaignId: string) {
  return doc(firestore, `campaigns/${campaignId}/settings/settings`);
}
