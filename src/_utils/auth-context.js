// _utils/auth-context.js

"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const useUserAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const emailSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const emailSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const passwordlessSignIn = (email) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/finishSignIn', // Update with your redirect URL
      handleCodeInApp: true,
    };
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
  };

  const completePasswordlessSignIn = (email, link) => {
    return signInWithEmailLink(auth, email, link);
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      emailSignIn,
      emailSignUp,
      passwordlessSignIn,
      completePasswordlessSignIn,
      firebaseSignOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}
