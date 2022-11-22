import { getSpotifyLoginUrl } from '@/lib/functions';
import { AppDispatch } from '@/stores/store';
import { updateSpotifyError, updateSpotifyLoading } from '../stores/musicSlice';
import { getRedirectUri } from '../utils/getRedirectUri';

export function startSpotifyLogin(dispatch: AppDispatch) {
  dispatch(updateSpotifyLoading(true));
  getSpotifyLoginUrl({ redirectUri: getRedirectUri() })
    .then(({ data }) => {
      const { url } = data;
      window.location.assign(url);
    })
    .catch((e) => {
      let errorMessage = 'Error get spotify auth url';
      if (typeof e === 'string') {
        errorMessage = e;
      }
      dispatch(updateSpotifyError(errorMessage));
    });
}
