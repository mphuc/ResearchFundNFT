import firebase from "firebase/compat/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9f1kIYzS4bgOlXGng2Z6bhgzi_if5wG8",
    authDomain: "attm-39eef.firebaseapp.com",
    projectId: "attm-39eef",
    storageBucket: "attm-39eef.appspot.com",
    messagingSenderId: "739854422162",
    appId: "1:739854422162:web:37acd712389f9c966fd64b",
    measurementId: "G-Y8HGT57VVG"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
