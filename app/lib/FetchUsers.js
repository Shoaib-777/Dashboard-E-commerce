'use server'

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../DB/ConnectDB";
import {  MongoClient, ObjectId } from 'mongodb';


// MongoDB connection string from environment variable
const uri = process.env.MONGO;
const client = new MongoClient(uri);

// Fetch users with pagination support
export const FetchUsers = async (page, usersPerPage, q) => {
    const regex = new RegExp(q, "i"); // Create a regex for case-insensitive search
    try {
        const { db } = await connectToDatabase(); 
        // Access the 'users' collection
        const collection = db.collection('users');

        // Calculate the number of users to skip
        const skip = (page - 1) * usersPerPage;

        // Fetch users with pagination (skip and limit) and search query
        const users = await collection.find({
            $or: [
                { username: {$regex : regex} }, // Match username
                { email: {$regex : regex} }, // Match username
                { phone: {$regex : regex} }     // Match phone number
            ]
        })
        .skip(skip)
        .limit(usersPerPage)
        .toArray();

        // Fetch the total number of users (for pagination calculation)
        const totalUsers = await collection.countDocuments({
            $or: [
                { username: {$regex : regex} },
                { email: {$regex : regex} },
                { phone: {$regex : regex} }
            ]
        });

        // Return users and total count for pagination
        return { users, totalUsers };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { users: [], totalUsers: 0 };
    } 
};

// Delete user function remains the same
export const DeleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await client.connect();
        const db = client.db('E-commerce3');
        const collection = db.collection('users');
        await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (err) {
        console.log("Error deleting user:", err);
    } finally {
        await client.close();
    }
    revalidatePath('/dashboard/users');
};