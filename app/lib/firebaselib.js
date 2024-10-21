import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCdLJJ-UMStJ6hQ33RbBbJ9Msrxyx7iJeI",
    authDomain: "admin-dashboard-b87b4.firebaseapp.com",
    projectId: "admin-dashboard-b87b4" ,
    storageBucket:  "admin-dashboard-b87b4.appspot.com",
    messagingSenderId:  "552184790838",
    appId:  "1:552184790838:web:23632a7dad1c76b4cb3d97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app)

export { db, storage,auth };
