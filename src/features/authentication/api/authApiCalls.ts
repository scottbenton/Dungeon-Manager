import {
  ErrorFn,
  getAuth,
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseApp } from '@/lib/firebase';

const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();

export function firebaseUserListener(
  onUser: (user: User | null) => void,
  onError: ErrorFn
) {
  return onAuthStateChanged(auth, onUser, (err) => {
    onError(err);
  });
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function loginWithGoogle() {
  return signInWithPopup(auth, googleAuthProvider);
}

export function createEmailAndPasswordUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginEmailAndPasswordUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
