// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1u3KP0PvWjLbgFutfBYYWAMjQo4SNMFc",
  authDomain: "noteimperial-537ce.firebaseapp.com",
  projectId: "noteimperial-537ce",
  storageBucket: "noteimperial-537ce.firebasestorage.app",
  messagingSenderId: "4001490355",
  appId: "1:4001490355:web:4f683c9b76368a570257c6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };