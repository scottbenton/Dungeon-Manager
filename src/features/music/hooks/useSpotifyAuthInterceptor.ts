import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { getSpotifyAccessToken } from '../api/getSpotifyAccessToken';
import { spotifyApi } from '../lib/spotifyApi';

export function useSpotifyAuthInterceptor() {
  const { accessToken, refreshToken } = useReduxSelector((state) => ({
    accessToken: state.music.spotifyAuth.accessToken,
    refreshToken: state.music.spotifyAuth.refreshToken,
  }));

  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (accessToken) {
      spotifyApi.interceptors.request.use((config) => {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
        return config;
      });
    }

    return () => {
      spotifyApi.interceptors.request.clear();
    };
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      spotifyApi.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const { config, response } = error;
          if (config && response && response.status === 401) {
            await getSpotifyAccessToken(refreshToken, dispatch);
            return spotifyApi(config);
          }
          return Promise.reject(error);
        },
      );
    }

    return () => {
      spotifyApi.interceptors.request.clear();
      spotifyApi.interceptors.response.clear();
    };
  }, [refreshToken, dispatch]);
}
