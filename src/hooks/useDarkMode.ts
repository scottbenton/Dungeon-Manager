import { THEMES } from '@/stores/SettingsState';
import { useReduxSelector } from './reduxHooks';

export function useIsDarkMode() {
  return useReduxSelector((state) => state.settings.theme === THEMES.DARK);
}
