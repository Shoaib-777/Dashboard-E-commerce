import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_Api_Key,
    authDomain: process.env.NEXT_PUBLIC_AuthDomain,
    projectId: process.env.NEXT_PUBLIC_Project_Id ,
    storageBucket:  process.env.NEXT_PUBLIC_Storage_BUcket,
    messagingSenderId:  process.env.NEXT_PUBLIC_Messaging_Sender_ID,
    appId:  process.env.NEXT_PUBLIC_APP_Id
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app)

export { db, storage,auth };
