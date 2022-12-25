// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDuGZrkgR5EpjPjpzGNhWaxCNfpIeBSo78',
  authDomain: 'chatapp-533eb.firebaseapp.com',
  projectId: 'chatapp-533eb',
  storageBucket: 'chatapp-533eb.appspot.com',
  messagingSenderId: '1085136609043',
  appId: '1:1085136609043:web:b2d4e22eee5567ea2784e6',
  measurementId: 'G-XPBBDJ7L6W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
