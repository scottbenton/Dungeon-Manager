import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { CampaignState } from './CampaignState';
import { CampaignSettingsType, CampaignType } from '@/types/campaign.type';
import { loadCampaigns } from '../api/loadCampaigns';
import { ItemType, ItemTypes } from '@/types/item.type';
import { loadItems } from '../api/items/loadItems';
import { loadCampaignSettings } from '../api/settings/loadCampaignSettings';

const initialState: CampaignState = {
  campaigns: {},
  campaignImages: {},
  campaignItems: {},
  campaignSettings: {},
  isLoading: true,
};

export const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    updateCampaign(
      state,
      action: PayloadAction<{ id: string; campaign: CampaignType }>,
    ) {
      state.isLoading = false;
      state.campaigns[action.payload.id] = action.payload.campaign;
    },
    removeCampaign(state, action: PayloadAction<string>) {
      delete state.campaigns[action.payload];
    },
    updateError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    initItemTypes: (state, action: PayloadAction<string>) => {
      if (state.campaignItems[action.payload] === undefined) {
        state.campaignItems[action.payload] = {
          [ItemTypes.NPCs]: { isLoading: true, items: {} },
          [ItemTypes.Locations]: { isLoading: true, items: {} },
          [ItemTypes.Lore]: { isLoading: true, items: {} },
        };
      }
    },
    updateCampaignItemTypeLoading: (
      state,
      action: PayloadAction<{
        campaignId: string;
        itemType: ItemTypes;
        isLoading: boolean;
      }>,
    ) => {
      const { campaignId, itemType, isLoading } = action.payload;

      if (state.campaignItems[campaignId] === undefined) {
        state.campaignItems[campaignId] = {
          [ItemTypes.NPCs]: { isLoading: true, items: {} },
          [ItemTypes.Locations]: { isLoading: true, items: {} },
          [ItemTypes.Lore]: { isLoading: true, items: {} },
        };
      }
      state.campaignItems[campaignId]![itemType].isLoading = isLoading;
    },
    updateCampaignItemType: (
      state,
      action: PayloadAction<{
        campaignId: string;
        itemType: ItemTypes;
        itemId: string;
        item: ItemType;
      }>,
    ) => {
      const { campaignId, itemType, itemId, item } = action.payload;
      if (state.campaignItems[campaignId] === undefined) {
        state.campaignItems[campaignId] = {
          [ItemTypes.NPCs]: { isLoading: true, items: {} },
          [ItemTypes.Locations]: { isLoading: true, items: {} },
          [ItemTypes.Lore]: { isLoading: true, items: {} },
        };
      }
      state.campaignItems[campaignId]![itemType].isLoading = false;
      state.campaignItems[campaignId]![itemType].items[itemId] = item;
    },
    updateCampaignItemTypeError: (
      state,
      action: PayloadAction<{
        campaignId: string;
        itemType: ItemTypes;
        error: string;
      }>,
    ) => {
      const { campaignId, itemType, error } = action.payload;
      if (state.campaignItems[campaignId] === undefined) {
        state.campaignItems[campaignId] = {
          [ItemTypes.NPCs]: { isLoading: true, items: {} },
          [ItemTypes.Locations]: { isLoading: true, items: {} },
          [ItemTypes.Lore]: { isLoading: true, items: {} },
        };
      }
      state.campaignItems[campaignId]![itemType].isLoading = false;
      state.campaignItems[campaignId]![itemType].error = error;
    },
    removeCampaignItemType: (
      state,
      action: PayloadAction<{
        campaignId: string;
        itemType: ItemTypes;
        itemId: string;
      }>,
    ) => {
      const { campaignId, itemType, itemId } = action.payload;
      if (state.campaignItems[campaignId] === undefined) {
        state.campaignItems[campaignId] = {
          [ItemTypes.NPCs]: { isLoading: true, items: {} },
          [ItemTypes.Locations]: { isLoading: true, items: {} },
          [ItemTypes.Lore]: { isLoading: true, items: {} },
        };
      }
      delete state.campaignItems[campaignId]![itemType].items[itemId];
    },
    setImageLoading: (
      state,
      action: PayloadAction<{ campaignId: string; imageName: string }>,
    ) => {
      if (state.campaignImages[action.payload.campaignId] === undefined) {
        state.campaignImages[action.payload.campaignId] = {};
      }
      if (
        !state.campaignImages[action.payload.campaignId]![
          action.payload.imageName
        ]
      ) {
        state.campaignImages[action.payload.campaignId]![
          action.payload.imageName
        ] = { isLoading: true };
      }
    },
    setImage: (
      state,
      action: PayloadAction<{
        campaignId: string;
        imageName: string;
        url: string;
      }>,
    ) => {
      if (state.campaignImages[action.payload.campaignId] === undefined) {
        state.campaignImages[action.payload.campaignId] = {};
      }
      state.campaignImages[action.payload.campaignId]![
        action.payload.imageName
      ] = { isLoading: false, url: action.payload.url };
    },
    updateCampaignSettings: (
      state,
      action: PayloadAction<{
        campaignId: string;
        campaignSettings: CampaignSettingsType;
      }>,
    ) => {
      const { campaignId, campaignSettings } = action.payload;

      state.campaignSettings[campaignId] = {
        isLoading: false,
        settings: campaignSettings,
      };
    },
  },
});

export const {
  updateLoading,
  updateCampaign,
  removeCampaign,
  updateError,
  updateCampaignItemTypeLoading,
  updateCampaignItemType,
  updateCampaignItemTypeError,
  removeCampaignItemType,
  initItemTypes,
  setImageLoading,
  setImage,
  updateCampaignSettings,
} = campaignSlice.actions;

export const createCampaignListener = (userId: string, dispatch: Dispatch) => {
  // This is a placeholder for the actual implementation
  console.log('Listening for campaigns');
  dispatch(updateLoading(true));
  const unsubscribe = loadCampaigns(
    userId,
    () => dispatch(updateLoading(false)),
    (campaignId, campaign) =>
      dispatch(updateCampaign({ id: campaignId, campaign })),
    (campaignId) => dispatch(removeCampaign(campaignId)),
    (error) => dispatch(updateError(error)),
  );

  return unsubscribe;
};

export function createCampaignItemListener(
  campaignId: string,
  dispatch: Dispatch,
) {
  dispatch(initItemTypes(campaignId));
  const unsubscribe = loadItems(
    campaignId,
    (itemType) =>
      dispatch(
        updateCampaignItemTypeLoading({
          campaignId,
          itemType,
          isLoading: false,
        }),
      ),
    (itemType, itemId, item) =>
      dispatch(updateCampaignItemType({ campaignId, itemType, itemId, item })),
    (itemType, itemId) =>
      dispatch(removeCampaignItemType({ campaignId, itemType, itemId })),
    (itemType, error) =>
      dispatch(updateCampaignItemTypeError({ campaignId, itemType, error })),
  );
  return unsubscribe;
}

export function createCampaignSettingsListener(
  campaignId: string,
  dispatch: Dispatch,
) {
  const unsubscribe = loadCampaignSettings(
    campaignId,
    (settings) =>
      dispatch(
        updateCampaignSettings({
          campaignId,
          campaignSettings: settings,
        }),
      ),
    (error) => {},
  );
  return unsubscribe;
}
