import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAeSCot4-871vEsKFvBgwqqJihayH3z0vo",
  authDomain: "portfolio-sany.firebaseapp.com",
  projectId: "portfolio-sany",
  storageBucket: "portfolio-sany.appspot.com",
  messagingSenderId: "140477481726",
  appId: "1:140477481726:web:a266184bf00913e89a1baf",
  measurementId: "G-JYJKPWHKYT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
