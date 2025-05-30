// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import {getAuth} from "firebase/auth";
// import auth from '@react-native-firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCMwUVOYgyL-VqLgbB3Qwlh2p3o-IFjaR4",
//   authDomain: "ecommerce-aaec5.firebaseapp.com",
//   projectId: "ecommerce-aaec5",
//   storageBucket: "ecommerce-aaec5.firebasestorage.app",
//   messagingSenderId: "1011696942234",
//   appId: "1:1011696942234:web:eb68cf1136a6635f9c3323",
//   measurementId: "G-2ED767HSY4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const analytics = getAnalytics(app);
// export {auth};

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyCMwUVOYgyL-VqLgbB3Qwlh2p3o-IFjaR4",
  authDomain: "ecommerce-aaec5.firebaseapp.com",
  projectId: "ecommerce-aaec5",
  storageBucket: "ecommerce-aaec5.firebasestorage.app",
  messagingSenderId: "1011696942234",
  appId: "1:1011696942234:web:eb68cf1136a6635f9c3323",
  measurementId: "G-2ED767HSY4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const analytics = firebase.analytics();
export const firestore = getFirestore();
export default firebase;
// I changed this file from the original firebaseConfig.js to use firebase/compat for compatibility with existing code