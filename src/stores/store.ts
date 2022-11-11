import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/authentication/stores/authSlice';
import { imageSlice } from '@/features/images/stores/imageSlice';
import { musicSlice } from '@/features/music/stores/musicSlice';
import { loggerMiddleware } from './loggerMiddleware';
import { settingsSlice } from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    images: imageSlice.reducer,
    music: musicSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type AppDispatch = typeof store.dispatch;
