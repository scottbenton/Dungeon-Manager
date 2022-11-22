import { store } from '@/stores/store';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { getSpotifyAccessToken } from '../api/getSpotifyAccessToken';

export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

spotifyApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${store.getState().music.spotifyAuth.accessToken}`,
  };
  return config;
});

createAuthRefreshInterceptor(
  spotifyApi,
  () =>
    new Promise<void>((resolve, reject) => {
      getSpotifyAccessToken(
        store.getState().music.spotifyAuth.refreshToken || '',
        store.dispatch
      )
        .then(() => resolve())
        .catch(() => reject());
    })
);
