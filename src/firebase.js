import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC7OS3lAA83tYRw02c5l_HVOAaI2B8eKjc",
  authDomain: "ig-clone-bf938.firebaseapp.com",
  projectId: "ig-clone-bf938",
  storageBucket: "ig-clone-bf938.appspot.com",
  messagingSenderId: "976592304596",
  appId: "1:976592304596:web:972532554cd5c1f89bfe41",
  measurementId: "G-E8YPHSX5V2",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
