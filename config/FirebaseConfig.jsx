// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-y3OhDawGN01c1wSMLouV5qWPDMNoPnk",
  authDomain: "aarti-f5de4.firebaseapp.com",
  projectId: "aarti-f5de4",
  storageBucket: "aarti-f5de4.appspot.com",
  messagingSenderId: "701862223837",
  appId: "1:701862223837:web:b04469ed917b0f7a0e6034",
  measurementId: "G-H04HWK1SBN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);