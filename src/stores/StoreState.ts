import { AuthState } from '@/features/authentication/stores/AuthState';
import { ImageState } from '@/features/images/stores/ImageState';
import { SettingsState } from './SettingsState';

export interface StoreState {
  auth: AuthState;
  settings: SettingsState;
  images: ImageState;
}
