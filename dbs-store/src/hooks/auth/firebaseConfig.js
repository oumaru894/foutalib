// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";  // Add authentication modules

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnhvwFusMG1CjGN4UtTSKejL-o7_WCbp8",
  authDomain: "foutalib-f623a.firebaseapp.com",
  projectId: "foutalib-f623a",
  storageBucket: "foutalib-f623a.appspot.com",
  messagingSenderId: "839286600878",
  appId: "1:839286600878:web:de03d48755b373b3c9693f",
  measurementId: "G-8E9C19Q9CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth and providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
