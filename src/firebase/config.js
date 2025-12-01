import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCP-VBzudwBpRxhCn-aLyQRkSrCu2X3GfM",
  authDomain: "tareas-aw.firebaseapp.com",
  projectId: "tareas-aw",
  storageBucket: "tareas-aw.firebasestorage.app",
  messagingSenderId: "821220379344",
  appId: "1:821220379344:web:4682f30dcea5aefa43acd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);