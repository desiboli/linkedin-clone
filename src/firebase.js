import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJ6UjeBIOH_0DFQ8krfLs738m2ip-G18U",
  authDomain: "linkedin-clone-34834.firebaseapp.com",
  projectId: "linkedin-clone-34834",
  storageBucket: "linkedin-clone-34834.appspot.com",
  messagingSenderId: "444972965431",
  appId: "1:444972965431:web:8d5ceeae73d42544e9e9b2"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);

const auth = getAuth()

export { db, auth }