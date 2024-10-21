import { collection, addDoc, getDocs } from 'firebase/firestore';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaselib'; // Firebase Firestore import


export const FetchProducts = async (q) => {
  try {
    // Fetch all products from the Firestore collection
    const querySnapshot = await getDocs(collection(db, "Allproducts"));
    
    // Map through the documents and extract data
    let data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // If there's a search query, filter the results by title, description, category, or match price/quantity if the query is a number
    if (q) {
      const searchLower = q.toLowerCase();
      const searchNumber = parseFloat(q); // Convert query to number (if it's a valid number)

      data = data.filter((product) =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        (!isNaN(searchNumber) && (product.price === searchNumber || product.quantity === searchNumber))  // Check if price or quantity matches the number
      );
    }

    return data; // Return the filtered array
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};




export const addProduct = async (product) => {
  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `images/${product.image.name}`);
    await uploadBytes(storageRef, product.image);
    const quantity = parseInt(product.quantity); // Converts to integer
    const price = parseInt(product.price); 
    
    // Get image URL after upload
    const imageUrl = await getDownloadURL(storageRef);

    // Add product to Firestore with image URL
    const docRef = await addDoc(collection(db, 'Allproducts'), {
      title: product.title,
      description: product.description,
      image: imageUrl,
      quantity: quantity,
      price: price,
      category: product.category,
    });
    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
