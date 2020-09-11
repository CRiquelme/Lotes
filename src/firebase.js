import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFAEUR3ulnv4D-H3o6QyLx5Mecf3cCF1M",
  authDomain: "cr-lotes.firebaseapp.com",
  databaseURL: "https://cr-lotes.firebaseio.com",
  projectId: "cr-lotes",
  storageBucket: "cr-lotes.appspot.com",
  messagingSenderId: "764927157936",
  appId: "1:764927157936:web:fbdaf2749e3f1017d63d75",
  measurementId: "G-BRV5D14LPY",
};
// Initialize Firebase
const f = firebase.initializeApp(firebaseConfig);
const db = f.firestore();

export { db, f };
