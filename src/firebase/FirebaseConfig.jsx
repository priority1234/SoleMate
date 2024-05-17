// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp7ItaPDn5UU6Lf1j7oidM1RSWW6egOCk",
  authDomain: "sole-mate-55bb4.firebaseapp.com",
  projectId: "sole-mate-55bb4",
  storageBucket: "sole-mate-55bb4.appspot.com",
  messagingSenderId: "214187613673",
  appId: "1:214187613673:web:093e372aca2f321773ff78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };
