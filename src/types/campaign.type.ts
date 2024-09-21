import { ItemType, ItemTypes } from './item.type';

export enum CampaignRole {
  GM = 'gm',
}

export interface CampaignType {
  name: string;
  campaignImageFilename: string | null;
  currentImage: {
    source: ItemTypes;
    itemId: string;
    filename: string;
  } | null;

  showSecondaryDisplay?: boolean | null;

  users: string[];
  userRoles: Record<string, CampaignRole>;
}

export interface TextFieldDefinition {
  label: string;
  randomValues: string[] | ((doc: ItemType) => string[] | null) | null;
  defaultValue: string | null;
  gmOnly: boolean;
  type: 'text';
  order: number;
}

export type CustomFieldDefinition = TextFieldDefinition;

export interface CampaignSettingsType {
  showSecondaryDisplay?: boolean;
  customFields?: Record<
    ItemTypes,
    Record<string, CustomFieldDefinition> | undefined
  >;
}
