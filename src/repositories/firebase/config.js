// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //importado desde la documentación de firebase => authentification/web/comenzar -> https://firebase.google.com/docs/auth/web/start?hl=es-419
import { getFirestore } from "firebase/firestore"; //Código extra sacado de https://firebase.google.com/docs/firestore/quickstart?hl=es-419
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYspLoykwDmjlfHONN2tmSs7ZILEKej_4",
  authDomain: "register-medic.firebaseapp.com",
  projectId: "register-medic",
  storageBucket: "register-medic.firebasestorage.app",
  messagingSenderId: "121996074979",
  appId: "1:121996074979:web:1dbc2dd05df2bc22a68ad6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

//Código extra importado desde la documentación de firebase => authentification/web/comenzar -> https://firebase.google.com/docs/auth/web/start?hl=es-419
export const auth = getAuth(app); 

//Código extra sacado de https://firebase.google.com/docs/firestore/quickstart?hl=es-419
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);