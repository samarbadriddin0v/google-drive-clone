import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-b3808.firebaseapp.com",
  projectId: "drive-b3808",
  storageBucket: "drive-b3808.appspot.com",
  messagingSenderId: "81678356040",
  appId: "1:81678356040:web:17ad6998200104ea22127d",
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { db, storage };
