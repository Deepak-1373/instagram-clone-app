import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyCsNl3Q8-IcEdTfDL-xgRGD_IKs3n-AvSg",
    authDomain: "instagram-clone-app-be26f.firebaseapp.com",
    databaseURL: "https://instagram-clone-app-be26f.firebaseio.com",
    projectId: "instagram-clone-app-be26f",
    storageBucket: "instagram-clone-app-be26f.appspot.com",
    messagingSenderId: "921459831895",
    appId: "1:921459831895:web:1ceb6562072ebdf8c49f12",
    measurementId: "G-GD2X7MHFGG"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
