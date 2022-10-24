import { firebaseApp } from '@/lib/firebase';
import { getFirestore } from 'firebase/firestore';

export const firestore = getFirestore(firebaseApp);
