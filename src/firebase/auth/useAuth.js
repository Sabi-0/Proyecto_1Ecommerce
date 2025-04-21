// src/firebase/auth/useAuth.js
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email:", error);
      throw error;
    }
  };

  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error signing in as guest:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Si el usuario era anónimo, puedes considerar limpiar datos locales aquí
      localStorage.removeItem("guestCart");
      sessionStorage.clear();
      // Otras limpiezas necesarias
      window.location.reload(); // Para asegurar limpieza completa
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    currentUser,
    loading,
    loginWithGoogle,
    loginWithEmail,
    loginAsGuest,
    logout,
  };
}
