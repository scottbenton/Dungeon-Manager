import { routePaths, ROUTES } from '@/config/routes';
import { useReduxDispatch } from '@/hooks/reduxHooks';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { completeSpotifyLogin } from '../api/completeSpotifyLogin';

function SpotifyCallbackPage() {
  const [params] = useSearchParams();
  const isLoading = useRef(false);
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get('code');

    if (!isLoading.current && code) {
      isLoading.current = true;
      completeSpotifyLogin(code, dispatch).finally(() => {
        navigate(routePaths[ROUTES.MUSIC]);
      });
    }
  }, [params, navigate, dispatch]);

  return <>Loading...</>;
}

export default SpotifyCallbackPage;
