'use server';

import { deleteDoc, doc } from "firebase/firestore";
import {  db } from "./firebaselib";
import { revalidatePath } from "next/cache";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { adminAuth } from "./firebaseAdmin";


export const DeleteStaffMember = async (formData) => {
  const id = formData.get('id');  // Extract staff member ID from the form

  // Initialize Firebase Auth and Storage
  const storage = getStorage();
  
  try {
      // Get a reference to the staff document and delete it
      const staffDocRef = doc(db, 'staff', id);
      await deleteDoc(staffDocRef);
      
      await adminAuth.deleteUser(id);
      console.log(`User has been deleted from authentication.`);

      // Delete the user's profile image from Firebase Storage
      const imageRef = ref(storage, `profiles/${id}`);
      await deleteObject(imageRef);
      console.log(`Profile image has been deleted from storage.`);
      
      // Revalidate the staff members page
      revalidatePath('/dashboard/staff');
  } catch (error) {
      console.error("Error deleting staff member:", error);
  }
};

  export const DeleteProduct = async (formData) => {
  
    const id = formData.get('id');  // Extract staff member ID from the form
    try {
      // Get a reference to the staff document and delete it
      const staffDocRef = doc(db, 'Allproducts', id);
      await deleteDoc(staffDocRef);
      // console.log(`Staff member with ID: ${id} has been deleted.`);
      revalidatePath('/dashboard/products')
    } catch (error) {
      console.error("Error deleting staff member:", error);
    }
  };
  