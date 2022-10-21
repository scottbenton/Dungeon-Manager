export enum ROUTES {
  IMAGES = 'images',
  IMAGE_VIEWER = 'imageViewer',
  LOGIN = 'login',
  SIGN_UP = 'signUp',
}

export const routePaths = {
  [ROUTES.IMAGES]: '/images',
  [ROUTES.IMAGE_VIEWER]: '/images/:uid',
  [ROUTES.LOGIN]: '/login',
  [ROUTES.SIGN_UP]: '/signup',
};

export function constructImageViewerPath(uid: string) {
  return `/images/${uid}`;
}