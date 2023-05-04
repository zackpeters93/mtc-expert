import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  // Your firebase configuration
  apiKey: "AIzaSyAR-q5t1fJcQ0DSJX_kpicXOFWvl1qDcAU",
  authDomain: "mtcflutter.firebaseapp.com",
  projectId: "mtcflutter",
  storageBucket: "mtcflutter.appspot.com",
  messagingSenderId: "1045566107209",
  appId: "1:1045566107209:web:961e07b1c5d5f3232b5998",
  measurementId: "G-LFGT9FHNCY"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };