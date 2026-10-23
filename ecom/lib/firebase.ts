import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBSAEqBnu1CRlmsFm47wUWLTlkVk0D9R7w',
  authDomain: 'slate-clothing-e62a8.firebaseapp.com',
  projectId: 'slate-clothing-e62a8',
  storageBucket: 'slate-clothing-e62a8.firebasestorage.app',
  messagingSenderId: '591930534094',
  appId: '1:591930534094:web:1b12aad02e28d3c3a3089f',
  measurementId: 'G-7RDD80L1CC',
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
