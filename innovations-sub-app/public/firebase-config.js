// Firebase Configuration and Initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

// Firebase configuration
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVlJa2InnRhuq55twNu88kiJaq4GDtTFA",
    authDomain: "innovana-web-ar-vr.firebaseapp.com",
    databaseURL: "https://innovana-web-ar-vr-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "innovana-web-ar-vr",
    storageBucket: "innovana-web-ar-vr.firebasestorage.app",
    messagingSenderId: "694684220258",
    appId: "1:694684220258:web:b8ddcc5b86bb8138cfca3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, collection, addDoc, getDocs, deleteDoc, doc, query, where, onSnapshot, ref, uploadBytes, getDownloadURL };
