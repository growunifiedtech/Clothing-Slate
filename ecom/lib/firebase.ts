import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBSAEqBnu1CRlmsFm47wUWLTlkVk0D9R7w',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'slate-clothing-e62a8.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'slate-clothing-e62a8',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'slate-clothing-e62a8.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '591930534094',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:591930534094:web:1b12aad02e28d3c3a3089f',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-7RDD80L1CC',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('your_')
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (typeof window !== 'undefined') {
  try {
    if (isFirebaseConfigured) {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      auth = getAuth(app);
      googleProvider = new GoogleAuthProvider();

      // Initialize analytics safely if supported in browser
      import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
        isSupported().then((supported) => {
          if (supported && app) {
            getAnalytics(app);
          }
        }).catch(() => {});
      }).catch(() => {});
    }
  } catch (error) {
    console.warn('Firebase initialization notice:', error);
  }
}

export { app, auth, googleProvider, firebaseConfig };
