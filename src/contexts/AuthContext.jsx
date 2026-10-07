import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot
} from 'firebase/firestore';
import { paymentService } from '../services/paymentService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null); // Firestore user document data
  const [loading, setLoading] = useState(true);

  // Generate a random 6-character alphanumeric string
  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  async function signup(email, password, referredByCode = '') {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const normalizedReferralCode = String(referredByCode || '').trim().toUpperCase();

    // Generate unique referral code for the new user
    let newReferralCode = generateReferralCode();

    // Store in Firestore
    const userDocData = {
      email: user.email,
      isPremium: false,
      referralCode: newReferralCode,
      referredBy: normalizedReferralCode || null,
      referralProcessed: !normalizedReferralCode,
      successfulReferrals: 0,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), userDocData);

    // If referredBy is provided, we need to handle the referral logic
    if (normalizedReferralCode) {
      await processReferral(normalizedReferralCode);
    }

    return userCredential;
  }

  async function processReferral(referredByCode) {
    try {
      await paymentService.processReferral(referredByCode);
    } catch (error) {
      console.error("Error processing referral: ", error);
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function refreshUserData(user = currentUser) {
    if (!user) {
      setUserData(null);
      return null;
    }

    const docSnap = await getDoc(doc(db, 'users', user.uid));
    const data = docSnap.exists() ? docSnap.data() : null;
    setUserData(data);
    return data;
  }

  useEffect(() => {
    let unsubscribeUserData;
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeUserData?.();
      setCurrentUser(user);
      setUserData(null);
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      unsubscribeUserData = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
        if (auth.currentUser?.uid !== user.uid) return;
        setUserData(docSnap.exists() ? docSnap.data() : null);
        setLoading(false);
      }, (error) => {
        console.error('Could not load the signed-in account:', error);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      unsubscribeUserData?.();
    };
  }, []);

  const value = {
    currentUser,
    userData,
    refreshUserData,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
