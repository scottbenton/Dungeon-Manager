import { Suspense, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { routeConfig } from '@/routes';
import { cssReset } from './config/cssReset';
import { Layout } from './components/Layout';
import { useReduxDispatch } from './hooks/reduxHooks';
import { createFirebaseUserListener } from './features/authentication/stores/authSlice';
import { Page404 } from './routes/Page404';
import { AuthBlocker } from './components/AuthBlocker';

export function App() {
  cssReset();

  const dispatch = useReduxDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(createFirebaseUserListener);

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const location = useLocation();

  const pathConfig = Object.values(routeConfig).find((config) => {
    const match = matchPath(config.path, location.pathname);
    return !!match;
  });

  return (
    <Layout {...pathConfig?.layoutProps}>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/images'} replace />} />
        {Object.values(routeConfig).map(({ path, Component, requiresAuth }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthBlocker requiresAuth={requiresAuth}>
                <Suspense>
                  <Component />
                </Suspense>
              </AuthBlocker>
            }
          />
        ))}
        <Route path={'*'} element={<Page404 />} />
      </Routes>
    </Layout>
  );
}
