'use client'; // Add this line at the top

import { AddStaff } from "@/app/lib/FetchStaff";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export const dynamic = 'force-dynamic';

const AddMember = () => {
  const router = useRouter();
  const [showpassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    status: "",
    profile: null, // File upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call AddStaff function to upload the avatar and save staff data
      await AddStaff(formData);
      console.log("Staff member added successfully.");

      // Reset the form after submission
      router.push("/dashboard/staff");
    } catch (error) {
      console.error("Error adding staff member:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-62px)] overflow-y-auto bg-white border border-gray-300 shadow-xl">
      <h1 className="text-2xl font-semibold mb-4">Add New Staff Member</h1>
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

        <div className="flex flex-col relative">
          <label className="mb-1 text-gray-600">Password</label>
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Enter Strong Password"
            required
            minLength={6}
          />
          <div className="absolute right-3 top-[38px]">
            {showpassword ? (
              <LuEyeOff
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <LuEye
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
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
            required
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
              <option value="">-Select-Role-</option>
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
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
