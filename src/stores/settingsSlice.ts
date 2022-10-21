import { createSlice } from '@reduxjs/toolkit';
import { SettingsState, THEMES } from './SettingsState';

const localStorageThemeKey = 'user-theme';

function getLocalStorageThemeValue(): THEMES | undefined {
  const storageKey = localStorage.getItem(localStorageThemeKey);
  if (storageKey) {
    return storageKey === 'light' ? THEMES.LIGHT : THEMES.DARK;
  }
  return undefined;
}

function readUserThemePreference(): THEMES {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

const initialState: SettingsState = {
  theme: getLocalStorageThemeValue() || readUserThemePreference(),
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme(state) {
      const newTheme =
        state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      state.theme = newTheme;
      localStorage.setItem(localStorageThemeKey, newTheme);
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;
