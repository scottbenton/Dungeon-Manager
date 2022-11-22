import { AppDispatch } from '@/stores/store';
import { completeSpotifyLogin as completeSpotifyLoginFn } from '@/lib/functions';
import { getRedirectUri } from '../utils/getRedirectUri';
import { addSpotifyTokens, updateSpotifyError } from '../stores/musicSlice';

export function completeSpotifyLogin(code: string, dispatch: AppDispatch) {
  return new Promise((resolve, reject) => {
    completeSpotifyLoginFn({ code, redirectUri: getRedirectUri() })
      .then(({ data }) => {
        const { refreshToken, accessToken } = data;

        dispatch(addSpotifyTokens({ refreshToken, accessToken }));
        resolve(true);
      })
      .catch((e) => {
        const errorMessage = 'Failed to connect to Spotify.';

        dispatch(updateSpotifyError(errorMessage));
        reject(errorMessage);
      });
  });
}
