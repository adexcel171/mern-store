// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiaFGlP6V9QIB74rW9PS_MLizhHMwwSj0",
  authDomain: "mern-store-91eb2.firebaseapp.com",
  projectId: "mern-store-91eb2",
  storageBucket: "mern-store-91eb2.appspot.com",
  messagingSenderId: "914133497618",
  appId: "1:914133497618:web:a1b35bcaeac635a1cbe5cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;