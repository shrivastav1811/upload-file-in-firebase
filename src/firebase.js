// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCBNmk6outkZyR24gLV7udxeKO39VlG6M",
  authDomain: "fir-practs.firebaseapp.com",
  projectId: "fir-practs",
  storageBucket: "fir-practs.appspot.com",
  messagingSenderId: "107749313421",
  appId: "1:107749313421:web:5dc8845d87b7c18b8d8bc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app)