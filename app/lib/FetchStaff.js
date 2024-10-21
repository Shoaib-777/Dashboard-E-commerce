
import {  collection, getDocs , query, orderBy, limit, startAfter, getCountFromServer, setDoc, doc } from "firebase/firestore"; 
import { auth, db, storage } from "./firebaselib";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword } from "firebase/auth";


export const FetchStaff = async (page, usersPerPage, q) => {
  try {
    const staffCollection = collection(db, 'staff'); // Firestore collection

    // Create query constraints: order by username and limit for pagination
    let queryConstraints = [orderBy('username'), limit(usersPerPage)];

    // For pagination: If it's not the first page, get the last visible document
    if (page > 1) {
      const lastVisibleSnapshot = await getDocs(query(staffCollection, ...queryConstraints));
      const lastVisible = lastVisibleSnapshot.docs[lastVisibleSnapshot.docs.length - 1];
      queryConstraints.push(startAfter(lastVisible));
    }

    // Create the query
    const staffQuery = query(staffCollection, ...queryConstraints);
    const staffSnapshot = await getDocs(staffQuery);

    // Get total count of documents
    const totalUsersSnapshot = await getCountFromServer(staffCollection);
    const totalUsers = totalUsersSnapshot.data().count;

    // Map the snapshot data
    let staffData = staffSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // If 'q' is present, filter results manually on username, email, or phone
    if (q) {
      const searchLower = q.toLowerCase();
      staffData = staffData.filter((user) =>
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower)
      );
    }

    return { staffData, totalUsers };
  } catch (error) {
    console.error('Error fetching staff:', error);
    return { staffData: [], totalUsers: 0 };
  }
};



export const AddStaff = async (staffData) => {
  try {
    // Sign up user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, staffData.email, staffData.password);
    const user = userCredential.user;

    // Upload profile to Firebase Storage
    const profileRef = ref(storage, `profiles/${user.uid}`);
    await uploadBytes(profileRef, staffData.profile);

    const imageUrl = await getDownloadURL(profileRef);

    // Save additional user info in Firestore
    await setDoc(doc(db, "staff", user.uid), {
      username: staffData.username,
      email: staffData.email,
      phone: staffData.phone,
      role: staffData.role,
      status: staffData.status,
      profile: imageUrl,  // Save profile URL
    });

    console.log("Staff member added successfully!");
    return { success: true, user };
  } catch (e) {
    console.error('Error adding staff: ', e);
    return { success: false, error: e.message };
  }
};