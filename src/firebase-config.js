import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBfQatK9DkRK5TfKn6_KlYzfRhOMOnhxFQ",
  authDomain: "crud-f82c2.firebaseapp.com",
  projectId: "crud-f82c2",
  storageBucket: "crud-f82c2.appspot.com",
  messagingSenderId: "357719180027",
  appId: "1:357719180027:web:d88721b53fd49ab459e65e"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)

export default app;
