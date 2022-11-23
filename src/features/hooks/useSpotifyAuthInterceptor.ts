import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect } from 'react';
// import { getSpotifyAccessToken } from '../music/api/getSpotifyAccessToken';
import { spotifyApi } from '../music/lib/spotifyApi';

export function useSpotifyAuthInterceptor() {
  const { accessToken, refreshToken } = useReduxSelector((state) => ({
    accessToken: state.music.spotifyAuth.accessToken,
    refreshToken: state.music.spotifyAuth.refreshToken,
  }));

  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      spotifyApi.interceptors.request.use((config) => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        return config;
      });

      createAuthRefreshInterceptor(
        spotifyApi,
        () =>
          new Promise<void>((resolve, reject) => {
            resolve();
          })
      );
      // createAuthRefreshInterceptor(
      //   spotifyApi,
      //   () =>
      //     new Promise<void>((resolve, reject) => {
      //       getSpotifyAccessToken(refreshToken, dispatch)
      //         .then(() => resolve())
      //         .catch(() => reject());
      //     })
      // );
    }

    return () => {
      spotifyApi.interceptors.request.clear();
      spotifyApi.interceptors.response.clear();
    };
  }, [accessToken, refreshToken, dispatch]);
}
