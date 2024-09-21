import { CampaignSettingsType, CampaignType } from '@/types/campaign.type';
import { ItemType, ItemTypes } from '@/types/item.type';

export interface CampaignState {
  campaigns: Record<string, CampaignType>;
  campaignImages: Record<
    string,
    Record<string, { isLoading: boolean; url?: string } | undefined> | undefined
  >;
  campaignItems: Record<
    string,
    | Record<
        ItemTypes,
        {
          isLoading: boolean;
          items: Record<string, ItemType>;
          error?: string;
        }
      >
    | undefined
  >;
  campaignSettings: Record<
    string,
    { isLoading: boolean; settings?: CampaignSettingsType } | undefined
  >;
  isLoading: boolean;
  error?: string;
}
