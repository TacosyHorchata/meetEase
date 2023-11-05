import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr74MloFRx6Hdyo2DFpJ3MioKIlTBbmnk",
  authDomain: "auth-camtom.firebaseapp.com",
  projectId: "auth-camtom",
  storageBucket: "auth-camtom.appspot.com",
  messagingSenderId: "239931022024",
  appId: "1:239931022024:web:4c8a36a8ff79b78452e3fd",
};

const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
/*import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr74MloFRx6Hdyo2DFpJ3MioKIlTBbmnk",
  authDomain: "auth-camtom.firebaseapp.com",
  projectId: "auth-camtom",
  storageBucket: "auth-camtom.appspot.com",
  messagingSenderId: "239931022024",
  appId: "1:239931022024:web:4c8a36a8ff79b78452e3fd",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
*/
/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr74MloFRx6Hdyo2DFpJ3MioKIlTBbmnk",
  authDomain: "auth-camtom.firebaseapp.com",
  projectId: "auth-camtom",
  storageBucket: "auth-camtom.appspot.com",
  messagingSenderId: "239931022024",
  appId: "1:239931022024:web:4c8a36a8ff79b78452e3fd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
*/
/*
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBr74MloFRx6Hdyo2DFpJ3MioKIlTBbmnk",
  authDomain: "auth-camtom.firebaseapp.com",
  projectId: "auth-camtom",
  storageBucket: "auth-camtom.appspot.com",
  messagingSenderId: "239931022024",
  appId: "1:239931022024:web:4c8a36a8ff79b78452e3fd",
});

export default firebaseConfig;
*/
