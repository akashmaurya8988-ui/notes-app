import {
  getApp,
  getApps,
  initializeApp
} from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

// ERROR MESSAGE
export const firebaseConfigError =
  "Firebase is not configured. Add all NEXT_PUBLIC_FIREBASE_* environment variables in Vercel.";

const cleanEnv = (value) =>
  value
    ?.trim()
    .replace(/,$/, "")
    .replace(/^["']|["']$/g, "")
    .trim();

const createFirebaseService = (factory) => {
  try {
    return factory();
  } catch (error) {
    console.error(firebaseConfigError, error);
    return null;
  }
};

const firebaseConfig = {
  apiKey: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};

export const isFirebaseConfigured =
  Object.values(firebaseConfig).every(Boolean);

// INITIALIZE APP
const app =
  isFirebaseConfigured
    ? createFirebaseService(() =>
        getApps().length
          ? getApp()
          : initializeApp(firebaseConfig)
      )
    : null;

// AUTH
export const auth =
  app
    ? createFirebaseService(() =>
        getAuth(app)
      )
    : null;

// FIRESTORE
export const db =
  app
    ? createFirebaseService(() =>
        getFirestore(app)
      )
    : null;

// GOOGLE PROVIDER
export const googleProvider =
  app
    ? new GoogleAuthProvider()
    : null;