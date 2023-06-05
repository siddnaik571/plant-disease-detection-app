// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDl2Eo3hyKNaD3LozFXBjPgqDZmt4MKv3w",
  authDomain: "plantify-app-bf1df.firebaseapp.com",
  projectId: "plantify-app-bf1df",
  storageBucket: "plantify-app-bf1df.appspot.com",
  messagingSenderId: "1069992506320",
  appId: "1:1069992506320:web:f6a56914d565431a10bfd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db=getFirestore(app)
export const storage=getStorage(app)