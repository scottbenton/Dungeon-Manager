import { getSpotifyAccessToken as getSpotifyAccessTokenFn } from '@/lib/functions';
import { AppDispatch } from '@/stores/store';
import {
  clearSpotifyTokens,
  updateSpotifyAccessToken,
  updateSpotifyError,
} from '../stores/musicSlice';

export function getSpotifyAccessToken(
  refreshToken: string,
  dispatch: AppDispatch
) {
  return new Promise((resolve, reject) => {
    getSpotifyAccessTokenFn({ refreshToken })
      .then(({ data }) => {
        const { accessToken } = data;
        dispatch(updateSpotifyAccessToken(accessToken));
        resolve(true);
      })
      .catch((e) => {
        dispatch(updateSpotifyError('Error authenticating with Spotify.'));
        dispatch(clearSpotifyTokens());
        reject(e);
      });
  });
}
