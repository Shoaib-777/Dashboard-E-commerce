import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaselib";

// Function to fetch user by email
export const fetchUserByEmail = async (email) => {
  try {
    // Reference the 'staff' collection in Firestore
    const usersRef = collection(db, "staff");

    // Create a query to find a user with the given email
    const q = query(usersRef, where("email", "==", email));

    // Execute the query and get the results
    const querySnapshot = await getDocs(q);

    // Check if a user is found
    if (!querySnapshot.empty) {
      // Extract the first user's data
      const userDoc = querySnapshot.docs[0]; // Assuming one user per email
      const userData = userDoc.data();

      // Return the user data
      return userData;
    } else {
      console.log("No user found with the provided email.");
      return null;  // Return null if no user is found
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;  // Rethrow the error to handle it in the calling function
  }
};
