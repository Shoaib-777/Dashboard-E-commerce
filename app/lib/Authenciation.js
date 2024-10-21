import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaselib";
import { doc, setDoc } from "firebase/firestore";

export const SignUp = async (username, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user info in Firestore
        await setDoc(doc(db, "staff", user.uid), {
            username: username,
            email: email,
        });
        
        // console.log("User signed up successfully:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        return { success: false, error };
    }
}

export const SignIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Handle signed-in user, e.g., store user data or redirect
        // console.log("Signed in:", user);
        return user; // Return the user object if needed
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign-in:", errorCode, errorMessage);
        throw new Error(errorMessage); // You can throw the error to handle it in the frontend
    }
};

