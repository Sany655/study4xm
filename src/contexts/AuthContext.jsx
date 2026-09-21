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
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  increment
} from 'firebase/firestore';

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

    // Generate unique referral code for the new user
    let newReferralCode = generateReferralCode();

    // Store in Firestore
    const userDocData = {
      email: user.email,
      isPremium: false,
      referralCode: newReferralCode,
      referredBy: referredByCode || null,
      successfulReferrals: 0,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), userDocData);

    // If referredBy is provided, we need to handle the referral logic
    if (referredByCode) {
      await processReferral(referredByCode);
    }

    return userCredential;
  }

  async function processReferral(referredByCode) {
    try {
      // Find the user who owns this referral code
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('referralCode', '==', referredByCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const referrerDoc = querySnapshot.docs[0];
        const referrerRef = referrerDoc.ref;
        const referrerData = referrerDoc.data();

        // Increment successfulReferrals
        const newReferralsCount = (referrerData.successfulReferrals || 0) + 1;
        
        const updateData = {
          successfulReferrals: increment(1)
        };

        // If they hit 3, unlock Premium
        if (newReferralsCount >= 3 && !referrerData.isPremium) {
          updateData.isPremium = true;
        }

        await updateDoc(referrerRef, updateData);
      }
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch custom user data from Firestore (isPremium, etc)
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
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
