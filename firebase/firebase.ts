import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO - move these variables
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
});

export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

export function handleGoogleSignIn() {
  signInWithPopup(auth, googleAuthProvider);
}

export const firestore = getFirestore(app);
export const storage = getStorage(app);
