import { useReduxSelector } from '@/hooks/reduxHooks';
import { paths } from '@/routes';
import { Navigate, Outlet } from 'react-router-dom';

export interface AuthBlockerProps {
  requiresAuth: boolean;
}

export function AuthBlocker(props: AuthBlockerProps): JSX.Element {
  const { requiresAuth } = props;

  const { user, isLoading } = useReduxSelector((state) => state.auth);

  if (!requiresAuth || (requiresAuth && user)) {
    // We need the fragment here to surround "children"
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Outlet />;
  }
  if (isLoading) {
    // We need the fragment here to return nothing while we load - eventually we could show a loading state
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  return <Navigate to={paths.login} />;
}
