//src/_utils/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZNJWk1TPFi4ZkmTGf0M7soDjo5jID1gM",
  authDomain: "musikahan-44b5f.firebaseapp.com",
  projectId: "musikahan-44b5f",
  storageBucket: "musikahan-44b5f.appspot.com",
  messagingSenderId: "598891582865",
  appId: "1:598891582865:web:52e15ea3176cb6c081f630",
  measurementId: "G-QRK2C14PT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
//const analytics = getAnalytics(app);