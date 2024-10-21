'use server'
import { MongoClient, ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../DB/ConnectDB';

const uri = process.env.MONGO; 
const client = new MongoClient(uri);

export const FetchOrders = async (page, OrdersPerPage, q) => {
    const regex = new RegExp(q, "i"); // Create a regex for case-insensitive search
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('orders');
        const skip = (page - 1) * OrdersPerPage;

        // Modify the query to search within the 'address' object
        const orders = await collection.find({
            $or: [
                { 'address.fullName': { $regex: regex } }, // Search in 'address.fullName'
                { 'address.mobileNo': { $regex: regex } }, // Search in 'address.mobileNo'
                { 'address.state': { $regex: regex } }   // Search in 'address.state'
            ]
        })
        .skip(skip)
        .limit(OrdersPerPage)
        .toArray();

        const totalOrders = await collection.countDocuments({
            $or: [
                { 'address.fullName': { $regex: regex } },
                { 'address.mobileNo': { $regex: regex } },
                { 'address.state': { $regex: regex } }
            ]
        });

        // Return orders and total count for pagination
        return { orders, totalOrders };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { orders: [], totalOrders: 0 };
    }
};


export const FetchSingleOrder = async (id) => {
    try {
      await client.connect();
  
      const db = client.db('E-commerce3');
      const collection = db.collection('orders');
  
      // Fetch the single order based on the provided id
      const order = await collection.findOne({ _id: new ObjectId(id) });
  
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    } finally {
      // Ensure that the client will close when finished
      await client.close();
    }
  };

  export const updateOrderStatus = async ({ orderId, status }) => {
    if (!orderId || !status) throw new Error("Invalid data");
    
    try {
        await client.connect(); // Connect to MongoDB
        
        const db = client.db('E-commerce3');
        const collection = db.collection('orders');
        
        // Find the order by its ID and update the status
        const result = await collection.updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { orderStatus: status } }
        );
        
        return result;
    } catch (error) {
        console.error('Error updating order status:', error);
        return null;
    } finally {
        await client.close(); // Ensure the client will close when finished
    }
};
export const DeleteOrder = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        await client.connect();
        
        // Access the specific database
        const db = client.db('E-commerce3');
        
        // Access the collection
        const collection = db.collection('orders');
        
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