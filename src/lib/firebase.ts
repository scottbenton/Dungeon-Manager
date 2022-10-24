import { firebaseConfig } from '@/config/firebaseConfig';
import { initializeApp } from 'firebase/app';

export const firebaseApp = initializeApp(firebaseConfig);
