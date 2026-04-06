
// Firebase v12 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlytGpmwVZOxug1dIHYnVmNxa8cGai90Q",
  authDomain: "cartwave-112b6.firebaseapp.com",
  projectId: "cartwave-112b6",
  storageBucket: "cartwave-112b6.appspot.com",
  messagingSenderId: "966310171925",
  appId: "1:966310171925:web:5a8953a4657c2bcaf3451c",
  measurementId: "G-6W84DKJLKZ"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
