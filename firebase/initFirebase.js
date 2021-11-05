import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/database';

const firebaseConfig = ({
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

    apiKey: "AIzaSyBmwyIAILEIciWGKr7Y4-ir_R_QLC45ymE",
    authDomain: "fundaciones-quito.firebaseapp.com",
    databaseURL: "https://fundaciones-quito-default-rtdb.firebaseio.com",
    projectId: "fundaciones-quito",
    storageBucket: "fundaciones-quito.appspot.com",
    messagingSenderId: "434057459017",
    appId: "1:434057459017:web:17662afb190fa49dd49698",
});


    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
        console.log('Conectado con firebase');
    }
    const app = firebase.app();
    const auth = firebase.auth();
    const db = firebase.firestore();
    const storage = firebase.storage();
export { auth, db, storage };
console.log( app.name ? 'Firebase! ' : 'No funciona :/');