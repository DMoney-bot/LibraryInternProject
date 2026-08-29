// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-3v4bAaRGs1nBhcPpKbZDnETVWldBXHg",
  authDomain: "library-internship-81c2a.firebaseapp.com",
  projectId: "library-internship-81c2a",
  storageBucket: "library-internship-81c2a.firebasestorage.app",
  messagingSenderId: "776178062857",
  appId: "1:776178062857:web:2ab0ce02677b3c54934ad8",
  measurementId: "G-P0FPVZTDK2"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);