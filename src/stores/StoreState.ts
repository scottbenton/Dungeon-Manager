import { AuthState } from '@/features/authentication/stores/AuthState';
import { ImageState } from '@/features/images/stores/ImageState';
import { MusicState } from '@/features/music/stores/MusicState';
import { SettingsState } from './SettingsState';

export interface StoreState {
  auth: AuthState;
  settings: SettingsState;
  images: ImageState;
  music: MusicState;
}
