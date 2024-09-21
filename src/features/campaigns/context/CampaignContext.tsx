import { CampaignType } from '@/types/campaign.type';
import { createContext, PropsWithChildren, useContext } from 'react';

export const CampaignContext = createContext<{
  campaignId: string;
  campaign: CampaignType;
}>({
  campaignId: '',
  campaign: {
    name: '',
    campaignImageFilename: null,
    currentImage: null,
    userRoles: {},
    users: [],
  },
});

export function useCampaignContext() {
  return useContext(CampaignContext);
}

export function CampaignProvider(
  props: PropsWithChildren<{ campaignId: string; campaign: CampaignType }>,
) {
  return (
    <CampaignContext.Provider
      value={{ campaignId: props.campaignId, campaign: props.campaign }}
    >
      {props.children}
    </CampaignContext.Provider>
  );
}
