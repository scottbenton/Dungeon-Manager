import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/authentication/stores/authSlice';
import { settingsSlice } from './settingsSlice';
import { campaignSlice } from '@/features/campaigns/stores/campaignSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    settings: settingsSlice.reducer,
    campaigns: campaignSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
