import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/authentication/stores/authSlice';
import { imageSlice } from '@/features/images/stores/imageSlice';
import { loggerMiddleware } from './loggerMiddleware';
import { settingsSlice } from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    images: imageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type AppDispatch = typeof store.dispatch;
