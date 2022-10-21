import { LayoutProps } from '@/components/Layout';
import { routePaths, ROUTES } from '@/config/routes';
import React from 'react';

interface IRouteConfig {
  path: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
  requiresAuth: boolean;
  layoutProps?: LayoutProps;
}

export const routeConfig: { [path in ROUTES]: IRouteConfig } = {
  [ROUTES.IMAGES]: {
    path: routePaths[ROUTES.IMAGES],
    Component: React.lazy(() => import('@/features/images/routes/ImagePage')),
    requiresAuth: true,
  },
  [ROUTES.IMAGE_VIEWER]: {
    path: routePaths[ROUTES.IMAGE_VIEWER],
    Component: React.lazy(
      () => import('@/features/images/routes/ImageViewerPage')
    ),
    requiresAuth: false,
    layoutProps: {
      fullscreen: true,
    },
  },
  [ROUTES.LOGIN]: {
    path: routePaths[ROUTES.LOGIN],
    Component: React.lazy(
      () => import('@/features/authentication/routes/LoginPage')
    ),
    requiresAuth: false,
    layoutProps: {
      fullscreen: true,
      direction: 'row',
    },
  },
  [ROUTES.SIGN_UP]: {
    path: routePaths[ROUTES.SIGN_UP],
    Component: React.lazy(
      () => import('@/features/authentication/routes/SignUpPage')
    ),
    requiresAuth: false,
    layoutProps: {
      fullscreen: true,
      direction: 'row',
    },
  },
};
