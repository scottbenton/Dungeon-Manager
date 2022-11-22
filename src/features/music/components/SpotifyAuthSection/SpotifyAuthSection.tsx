import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { useReduxDispatch, useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect, useRef } from 'react';
import { getSpotifyAccessToken } from '../../api/getSpotifyAccessToken';
import { startSpotifyLogin } from '../../api/startSpotifyLogin';
import { SpotifyAuthContainer } from './SpotifyAuthSection.styles';

export function SpotifyAuthSection() {
  const { refreshToken, accessToken, errorMessage, isLoading } =
    useReduxSelector((state) => ({
      refreshToken: state.music.spotifyAuth.refreshToken,
      accessToken: state.music.spotifyAuth.accessToken,
      errorMessage: state.music.spotifyAuth.errorMessage,
      isLoading: state.music.spotifyAuth.isLoading,
    }));
  const dispatch = useReduxDispatch();
  const isAccessCallLoading = useRef(false);

  useEffect(() => {
    if (refreshToken && !accessToken && !isAccessCallLoading.current) {
      isAccessCallLoading.current = true;
      getSpotifyAccessToken(refreshToken, dispatch);
    }
  }, [accessToken, refreshToken, dispatch]);

  return (
    <SpotifyAuthContainer>
      {errorMessage && (
        <Alert
          title={'Spotify Error'}
          message={errorMessage}
          variant={'error'}
        />
      )}
      {!refreshToken && (
        <Button
          variant={'primary'}
          color={'brand'}
          onClick={() => startSpotifyLogin(dispatch)}
          loading={isLoading}
        >
          Login with Spotify
        </Button>
      )}
    </SpotifyAuthContainer>
  );
}
