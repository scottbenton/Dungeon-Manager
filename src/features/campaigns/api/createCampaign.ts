import { CampaignType } from '@/types/campaign.type';
import { uploadBytes } from 'firebase/storage';
import { campaignCollectionRef, getStorageRef } from './_getRef';
import { addDoc, setDoc } from 'firebase/firestore';
import { getCampaignSettingsRef } from './settings/_getRef';

export async function createCampaign(
  campaign: CampaignType,
  campaignImage?: File,
): Promise<string> {
  const campaignId = (await addDoc(campaignCollectionRef, campaign)).id;
  await setDoc(getCampaignSettingsRef(campaignId), {});
  if (campaignImage) {
    try {
      await uploadBytes(
        getStorageRef(campaignId, campaignImage.name),
        campaignImage,
      );
    } catch (error) {
      console.error(error);
    }
  }
  return campaignId;
}
