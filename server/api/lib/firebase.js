// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCVsnmc8cBxqFeRM844ej0g-M0MyM9of0",
  authDomain: "contestarena-5c70a.firebaseapp.com",
  databaseURL: "https://contestarena-5c70a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "contestarena-5c70a",
  storageBucket: "contestarena-5c70a.appspot.com",
  messagingSenderId: "429075200533",
  appId: "1:429075200533:web:048988ab861b7e84726c1c",
  measurementId: "G-GT0LE2P4H1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);