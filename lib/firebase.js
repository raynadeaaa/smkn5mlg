import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSxQBsAYW_sQdh9qlQ_frkhfPXmmgykTc",
  authDomain: "smkn5mlg-2e066.firebaseapp.com",
  projectId: "smkn5mlg-2e066",
  storageBucket: "smkn5mlg-2e066.firebasestorage.app",
  messagingSenderId: "565427395815",
  appId: "1:565427395815:web:8d734fc38598941aeed642",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
