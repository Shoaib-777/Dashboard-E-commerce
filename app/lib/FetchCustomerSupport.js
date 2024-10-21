'use server'
import { MongoClient, ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../DB/ConnectDB';

// Replace the following with your MongoDB connection string
const uri = process.env.MONGO; // Store the connection string in an environment variable
const client = new MongoClient(uri);

export const FetchCustomerSupport = async (page, usersPerPage,q) => {
    const regex = new RegExp(q, "i"); // Create a regex for case-insensitive search
    try {
        const {db} = await connectToDatabase()
        
        // Access the collection (replace 'messages' with your collection name)
        const collection = db.collection('contactus');
        const skip = (page - 1) * usersPerPage;

        // Fetch users with pagination (skip and limit)
        
        // Fetch the data from the collection
        const messages = await collection.find({
            $or: [
                { username: {$regex : regex} }, // Match username
                { email: {$regex : regex} }, // Match username
                { phone: {$regex : regex} }     // Match phone number
            ]
        }).skip(skip)
        .limit(usersPerPage)
        .toArray();
        const totalUsers = await collection.countDocuments({
            $or: [
                { username: {$regex : regex} }, // Match username
                { email: {$regex : regex} }, // Match username
                { phone: {$regex : regex} }     // Match phone number
            ]
        });

        
        // Return the fetched messages
        return {messages,totalUsers};
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { messages: [], totalUsers: 0 };
    } 
};


export const DeleteCustomerSupport = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await client.connect();
        
        // Access the specific database
        const db = client.db('E-commerce3');
        
        // Access the collection
        const collection = db.collection('contactus');
        
        // Delete the user by id
        await collection.deleteOne({ _id: new ObjectId(id) });
    } catch (err) {
        console.log("Error deleting user:", err);
    } finally {
        // Ensure that the client will close when finished
        await client.close();
    }

    // Revalidate the path to update the users list
    revalidatePath('/dashboard/users');
};

