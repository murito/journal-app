import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBWil6LqHHXAZZuDNxDvgmF-dxWOXJjXKM",
    authDomain: "react-app-96331.firebaseapp.com",
    projectId: "react-app-96331",
    storageBucket: "react-app-96331.appspot.com",
    messagingSenderId: "732536987854",
    appId: "1:732536987854:web:ef366b19e2cc5e43b4f09f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}