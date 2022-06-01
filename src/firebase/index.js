import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVh2SDSq_2Ic0iUCjL2NZG4SJZLkgSIPc",
  authDomain: "userauth-2a988.firebaseapp.com",
  databaseURL: "https://userauth-2a988.firebaseio.com",
  projectId: "userauth-2a988",
  storageBucket: "userauth-2a988.appspot.com",
  messagingSenderId: "614708845435",
  appId: "1:614708845435:web:a3ad84f3fb3eb6c254fbde",
  measurementId: "G-X2147V6YRF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const imagesRef = ref(storage, "images");

export const postsCol = collection(db, "posts");
