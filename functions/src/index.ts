import { https, logger, config } from 'firebase-functions';
import { randomBytes } from 'node:crypto';
import { encryptRefreshToken } from './helpers';
import fetch from 'node-fetch';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getRedirectUrl = https.onCall((data, context) => {
  const state = randomBytes(20).toString('hex');
  logger.log('Setting verification state:', state);
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  authUrl.searchParams.append('client_id', config().spotify.client_id);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', data.redirectUri);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append(
    'scope',
    'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state'
  );

  return {
    url: authUrl.toString(),
    state: state,
  };
});

exports.completeLogin = https.onCall(async (data, context) => {
  const { code, redirectUri } = data;

  if (!code) {
    throw new https.HttpsError('invalid-argument', 'Code is required');
  }

  const params = new URLSearchParams();

  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('client_id', config().spotify.client_id);
  params.append('client_secret', config().spotify.client_secret);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: params,
  });

  if (response.ok) {
    const body = await response.json();
    if (body.refresh_token) {
      const encryptedToken = encryptRefreshToken(
        body.refresh_token,
        config().spotify.refresh_token_passphrase
      );
      return { refreshToken: encryptedToken, accessToken: body.access_token };
    } else {
      logger.error(body);
      throw new https.HttpsError(
        'internal',
        'Refresh token was not provided in results'
      );
    }
  } else {
    logger.error(response);
    const text = await response.text();
    throw new https.HttpsError('internal', text);
  }
});
