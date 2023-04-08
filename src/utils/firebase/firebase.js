// import firebase from 'firebase'

import firebaseApp from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/functions'
import 'firebase/compat/analytics'

// import 'dotenv'

//2. Initialize app with the config vars
// const FIREBASE_SETTINGS = {
//    apiKey: "AIzaSyClXQz8mA_c-3DHV4aXMQk2KklzFywEnwU",
//    authDomain: "portal-iot-5c61e.firebaseapp.com",
//    projectId: "portal-iot-5c61e",
//    storageBucket: "portal-iot-5c61e.appspot.com",
//    messagingSenderId: "128451166231",
//    appId: "1:128451166231:web:99b44e18e59a9ca0701c52",
//    measurementId: "G-SDD5LQE3R8"
// };

const FIREBASE_SETTINGS = {
   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
   appId: process.env.REACT_APP_FIREBASE_APPID,
   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

firebaseApp.initializeApp(FIREBASE_SETTINGS)
// firebaseApp.analytics()

// @pending remover 
firebaseApp.functions().useEmulator("localhost", 5001);

const firebase = {
   auth: firebaseApp.auth,
   firestore: firebaseApp.firestore,
   storage: firebaseApp.storage,
   functions: firebaseApp.functions,
   fieldValue: firebaseApp.firestore.FieldValue,
}

export default firebase;

export const getTimestamp = () => {
   return firebase.firestore.Timestamp.now();
}