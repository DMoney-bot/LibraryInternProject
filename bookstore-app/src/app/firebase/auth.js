import {
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginAsGuest() {
  return signInAnonymously(auth);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth)
}