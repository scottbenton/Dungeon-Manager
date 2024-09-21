import { useReduxSelector } from '@/hooks/reduxHooks';
import { Navigate } from 'react-router-dom';
import { paths } from '.';

export function RootRedirect() {
  const userLoading = useReduxSelector((store) => store.auth.isLoading);
  const uid = useReduxSelector((store) => store.auth.user?.id);

  if (userLoading) {
    return null;
  }
  if (!uid) {
    return <Navigate to={paths.login} replace />;
  }

  return <Navigate to={paths.campaignList} replace />;
}
