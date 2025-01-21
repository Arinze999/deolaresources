import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {
    getStorage,
  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

// ----------------------------------------
// Firebase Configuration and Initialization
// ----------------------------------------
export const firebaseConfig = {
  apiKey: "AIzaSyAWGP7BrK07_erEaXgSVU3ZhlwBp3Qy3Bc",
  authDomain: "shadeproject-e6cdd.firebaseapp.com",
  projectId: "shadeproject-e6cdd",
  storageBucket: "shadeproject-e6cdd.firebasestorage.app",
  messagingSenderId: "170836665346",
  appId: "1:170836665346:web:7ec2c062f4c158f0a1f31b",
};

const helperStorageConfig = {
    apiKey: "AIzaSyCwPsG2yyWCaBlKBA_97WBtxlY_x-wkNMg",
    authDomain: "coinkeep-a5f93.firebaseapp.com",
    projectId: "coinkeep-a5f93",
    storageBucket: "coinkeep-a5f93.appspot.com",
    messagingSenderId: "905184825938",
    appId: "1:905184825938:web:9c644227cd868ad1bf858b",
  };

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Initialize Firebase Authentication
export const db = getFirestore(app);

// helpers
export const helperStorageApp = initializeApp(helperStorageConfig, "storageApp");
export const helperStorage = getStorage(helperStorageApp);