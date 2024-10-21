'use client';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '@/app/lib/firebaselib'; 

const UpdateStaffMember = ({ params }) => {
  const { id } = params; 
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    profile: null, // No need for profileUrl anymore
  });

  const [isUploading, setIsUploading] = useState(false);

  // Fetch current staff data from Firestore
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const docRef = doc(db, 'staff', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData({ ...docSnap.data(), profile: null });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.profile) {
      setIsUploading(true);

      // If there is an existing profile, delete the old profile image
      if (formData.profileUrl) {
        const oldProfileRef = ref(storage, formData.profileUrl);
        try {
          await deleteObject(oldProfileRef);
          console.log('Old profile image deleted successfully');
        } catch (error) {
          console.error('Error deleting old profile image:', error);
        }
      }

      // Upload new profile image to Firebase Storage
      const storageRef = ref(storage, `profiles/${id}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.profile);

      uploadTask.on(
        'state_changed',
        () => {}, // Handle progress if necessary
        (error) => {
          console.error('Error uploading profile image:', error);
          setIsUploading(false);
        },
        async () => {
          // Get download URL after successful upload
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update Firestore document with new profile image URL and other data
          await updateFirestoreDoc(downloadURL);
        }
      );
    } else {
      // Update Firestore document without profile image
      await updateFirestoreDoc();
    }
  };

  // Update Firestore document function
  const updateFirestoreDoc = async (profileImageUrl = null) => {
    try {
      const docRef = doc(db, 'staff', id);

      // Create an update object, conditionally including profile image URL
      const updatedData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
      };

      if (profileImageUrl) {
        updatedData.profile = profileImageUrl; // Replace old profile URL with new one
      }

      await updateDoc(docRef, updatedData);

      setIsUploading(false);

      // After successful update, navigate the user back to the staff page
      router.push('/dashboard/staff');
    } catch (error) {
      console.error('Error updating staff member:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100%-62px)] bg-white border border-gray-200 shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">Update Staff Member</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Enter username"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">Profile</label>
          <input
            type="file"
            name="profile"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="mb-1 text-gray-600">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            >
              <option value="">-Select Role-</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="mb-1 text-gray-600">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
          disabled={isUploading} 
        >
          {isUploading ? 'Updating...' : 'Update Member'}
        </button>
      </form>
    </div>
  );
};

export default UpdateStaffMember;
