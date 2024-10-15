// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3RD_12NLsOF5_cQ_6jPMsvaiXwHBUnpQ",
  authDomain: "estate-fc09b.firebaseapp.com",
  projectId: "estate-fc09b",
  storageBucket: "estate-fc09b.appspot.com",
  messagingSenderId: "1035114476486",
  appId: "1:1035114476486:web:0b3a29b460b77032d8b8c7",
  measurementId: "G-D3M3MG7CDW",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
