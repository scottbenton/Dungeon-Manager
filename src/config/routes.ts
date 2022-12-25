export enum ROUTES {
  IMAGES = 'images',
  IMAGE_VIEWER = 'imageViewer',
  MUSIC = 'music',
  LOGIN = 'login',
  SIGN_UP = 'signUp',
  SPOTIFY_CALLBACK = 'spotifyCallback',
}

export const routePaths = {
  [ROUTES.IMAGES]: '/images',
  [ROUTES.IMAGE_VIEWER]: '/images/:uid',
  [ROUTES.LOGIN]: '/login',
  [ROUTES.SIGN_UP]: '/signup',
  [ROUTES.MUSIC]: '/music',
  [ROUTES.SPOTIFY_CALLBACK]: '/spotify-callback',
};

export function constructImageViewerPath(uid: string) {
  return `/images/${uid}`;
}
