import { routePaths, ROUTES } from '@/config/routes';
import { useReduxSelector } from '@/hooks/reduxHooks';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export interface AuthBlockerProps extends PropsWithChildren {
  requiresAuth: boolean;
}

export function AuthBlocker(props: AuthBlockerProps): JSX.Element {
  const { children, requiresAuth } = props;

  const { user, isLoading } = useReduxSelector((state) => state.auth);

  if (!requiresAuth || (requiresAuth && user)) {
    // We need the fragment here to surround "children"
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  if (isLoading) {
    // We need the fragment here to return nothing while we load - eventually we could show a loading state
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  return <Navigate to={routePaths[ROUTES.LOGIN]} />;
}
