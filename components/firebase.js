// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmwoKkqxYW_dJ-rj43LKsf7ReQrxES56k",
  authDomain: "alphaaudio-f2f7f.firebaseapp.com",
  projectId: "alphaaudio-f2f7f",
  storageBucket: "alphaaudio-f2f7f.appspot.com",
  messagingSenderId: "663497078301",
  appId: "1:663497078301:web:97867b6cab72781ad138f4",
  measurementId: "G-9X9HRWZHG1",
  databaseURL: "https://alphaaudio-f2f7f-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db}