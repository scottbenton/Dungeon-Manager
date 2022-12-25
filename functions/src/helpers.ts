import { AES } from 'crypto-js';
import * as EncUTF8 from 'crypto-js/enc-utf8';

// export function generateRandomString(length: number) {
//   var text = '';
//   var possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// export function dec2hex(dec: number) {
//   return ('0' + dec.toString(16)).substr(-2);
// }

// export function generateCodeVerifier(): string {
//   const array = new Uint32Array(56 / 2);
//   crypto.getRandomValues(array);
//   return Array.from(array, dec2hex).join('');
// }

// export function sha256(plainString: string) {
//   // returns promise ArrayBuffer
//   const encoder = new TextEncoder();
//   const data = encoder.encode(plainString);
//   return crypto.subtle.digest('SHA-256', data);
// }

// export function base64Encode(
//   numbers: Iterable<number> | string,
//   isUrl?: boolean
// ) {
//   let str = '';
//   if (typeof numbers === 'string') {
//     str = numbers;
//   } else {
//     const bytes = new Uint8Array(numbers);
//     const len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//       str += String.fromCharCode(bytes[i]);
//     }
//   }

//   let base64 = btoa(str);

//   if (isUrl) {
//     base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
//   }
//   return base64;
// }

// export async function generateCodeChallengeFromVerifier(verifier: string) {
//   const hashed = await sha256(verifier);
//   const base64encoded = base64Encode(
//     hashed as unknown as Iterable<number>,
//     true
//   );
//   return base64encoded;
// }

export function encryptRefreshToken(str: string, passphrase: string) {
  return AES.encrypt(str, passphrase).toString();
}

export function decryptRefreshToken(str: string, passphrase: string) {
  return AES.decrypt(str, passphrase).toString(EncUTF8);
}
