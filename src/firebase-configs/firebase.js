import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase-config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Auth = firebase.auth();
export const googleLoginProvider = new firebase.auth.GoogleAuthProvider();