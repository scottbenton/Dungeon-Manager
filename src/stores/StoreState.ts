import { AuthState } from '@/features/authentication/stores/AuthState';
import { SettingsState } from './SettingsState';
import { CampaignState } from '@/features/campaigns/stores/CampaignState';

export interface StoreState {
  auth: AuthState;
  settings: SettingsState;
  campaigns: CampaignState;
}
