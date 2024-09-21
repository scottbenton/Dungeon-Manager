import { useReduxSelector } from '@/hooks/reduxHooks';
import { paths } from '@/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthRedirect() {
  const user = useReduxSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(paths.campaignList);
    }
  }, [user, navigate]);
}
