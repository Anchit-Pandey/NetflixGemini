// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLZua9pC5VGfbAM7uM3VbQGHhNPNDSjqA",
  authDomain: "netflix-gpt-4cd5e.firebaseapp.com",
  projectId: "netflix-gpt-4cd5e",
  storageBucket: "netflix-gpt-4cd5e.firebasestorage.app",
  messagingSenderId: "56657134819",
  appId: "1:56657134819:web:5054e7ae2cffa99eebb1d6",
  measurementId: "G-3Z38QLK9TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();