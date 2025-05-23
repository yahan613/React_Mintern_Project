// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVfUKPUMPclRIZTxOsZSKvvVXjXQ3QEMk",
  authDomain: "countbudd.firebaseapp.com",
  projectId: "countbudd",
  storageBucket: "countbudd.firebasestorage.app",
  messagingSenderId: "869667762168",
  appId: "1:869667762168:web:1e5ff736c390f701bb700d",
  measurementId: "G-QWFFTTLZ9C"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);