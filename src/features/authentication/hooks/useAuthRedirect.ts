import { routePaths, ROUTES } from '@/config/routes';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
  const user = useReduxSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(routePaths[ROUTES.IMAGES]);
    }
  }, [user, navigate]);
}
