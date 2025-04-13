import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-thOhqZ-srKSB7z6Sgtn6I4kqIHw2DlY",
    authDomain: "my-portfolio-1a66b.firebaseapp.com",
    projectId: "my-portfolio-1a66b",
    storageBucket: "my-portfolio-1a66b.firebasestorage.app",
    messagingSenderId: "817413783047",
    appId: "1:817413783047:web:f4095e72981dc05fa334a2",
    measurementId: "G-QKJ3C4GS7D"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
