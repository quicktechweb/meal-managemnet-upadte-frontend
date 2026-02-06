import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtYUeeWvqFX4-_l7Swg4CtG1EZLaceZT0",
  authDomain: "meal-management-210dc.firebaseapp.com",
  projectId: "meal-management-210dc",
  storageBucket: "meal-management-210dc.firebasestorage.app",
  messagingSenderId: "768656872169",
  appId: "1:768656872169:web:160548d2e647a9c83e5678",
  measurementId: "G-3SFBNTF653",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
