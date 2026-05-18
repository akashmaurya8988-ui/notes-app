"use client";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  createContext,
  useEffect,
  useState
} from "react";

import {
  auth,
  firebaseConfigError
} from "@/firebase/config";

export const AuthContext =
createContext();

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
  useState(null);

  const [loading, setLoading] =
  useState(Boolean(auth));

  useEffect(() => {

    if (!auth) {
      console.error(firebaseConfigError);
      return;
    }

    const unsubscribe =
    onAuthStateChanged(auth,
      (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading
      }}>

      {!loading && children}

    </AuthContext.Provider>
  );
};
