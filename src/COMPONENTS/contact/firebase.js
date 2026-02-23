// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeLn6XMFDWLiwFm3CqyQsSPAcWTJA5S64",
  authDomain: "fir-login-e72c3.firebaseapp.com",
  projectId: "fir-login-e72c3",
  storageBucket: "fir-login-e72c3.firebasestorage.app",
  messagingSenderId: "692030153310",
  appId: "1:692030153310:web:9c52943cfb5cf76f8c4acf",
  measurementId: "G-DD2S1PKW5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
