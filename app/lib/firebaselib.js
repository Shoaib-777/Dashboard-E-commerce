import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
    apiKey: process.env.Api_Key,
    authDomain: process.env.AuthDomain,
    projectId: process.env.Project_Id ,
    storageBucket:  process.env.Storage_BUcket,
    messagingSenderId:  process.env.Messaging_Sender_ID,
    appId:  process.env.APP_Id
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app)

export { db, storage,auth };
