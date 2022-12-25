import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseApp } from './firebase';

const functions = getFunctions(firebaseApp);

export const getSpotifyLoginUrl = httpsCallable<
  { redirectUri: string },
  { url: string; state: string }
>(functions, 'getRedirectUrl');

export const completeSpotifyLogin = httpsCallable<
  { code: string; redirectUri: string },
  { refreshToken: string; accessToken: string }
>(functions, 'completeLogin');

export const getSpotifyAccessToken = httpsCallable<
  { refreshToken: string },
  { accessToken: string }
>(functions, 'getAccessToken');
