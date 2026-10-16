'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  ConfirmationResult,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './firebase';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL?: string | null;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  setupRecaptcha: (containerId: string) => RecaptchaVerifier | null;
  sendPhoneOtp: (phoneNumber: string, appVerifier: RecaptchaVerifier) => Promise<ConfirmationResult>;
  logout: () => Promise<void>;
  loginAsDemoUser: (name: string, email: string, phone: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check saved session or demo user
  useEffect(() => {
    // Check localStorage demo user
    try {
      const savedDemo = localStorage.getItem('slate_demo_auth');
      if (savedDemo) {
        setUser(JSON.parse(savedDemo));
        setLoading(false);
        return;
      }
    } catch (e) {}

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          phoneNumber: firebaseUser.phoneNumber,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        // If not authenticated in Firebase and no demo user
        try {
          const savedDemo = localStorage.getItem('slate_demo_auth');
          if (!savedDemo) {
            setUser(null);
          }
        } catch (e) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      throw new Error('Firebase credentials not configured. Please add your credentials in .env.local.');
    }
    const result = await signInWithPopup(auth, googleProvider);
    setUser({
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
    });
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!auth) {
      throw new Error('Firebase credentials not configured. Please add your credentials in .env.local.');
    }
    const result = await signInWithEmailAndPassword(auth, email, pass);
    setUser({
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
    });
  };

  const signupWithEmail = async (email: string, pass: string, name: string) => {
    if (!auth) {
      throw new Error('Firebase credentials not configured. Please add your credentials in .env.local.');
    }
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) {
      await updateProfile(result.user, { displayName: name });
    }
    setUser({
      uid: result.user.uid,
      displayName: name || result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
    });
  };

  const setupRecaptcha = (containerId: string): RecaptchaVerifier | null => {
    if (!auth || typeof window === 'undefined') return null;
    try {
      const verifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {},
      });
      return verifier;
    } catch (err) {
      console.error('Recaptcha error:', err);
      return null;
    }
  };

  const sendPhoneOtp = async (phoneNumber: string, appVerifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
    if (!auth) {
      throw new Error('Firebase credentials not configured. Please add your credentials in .env.local.');
    }
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  };

  const logout = async () => {
    try {
      localStorage.removeItem('slate_demo_auth');
    } catch (e) {}
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
  };

  const loginAsDemoUser = (name: string, email: string, phone: string) => {
    const demoUser: AuthUser = {
      uid: `demo-${Date.now()}`,
      displayName: name,
      email,
      phoneNumber: phone,
      isDemo: true,
    };
    setUser(demoUser);
    try {
      localStorage.setItem('slate_demo_auth', JSON.stringify(demoUser));
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseConfigured,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        setupRecaptcha,
        sendPhoneOtp,
        logout,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
