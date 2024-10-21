'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import { db, storage } from '@/app/lib/firebaselib';

const UpdateProduct = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    quantity: '',
    price: '',
  });
  const [newImage, setNewImage] = useState(null); // State for new image file
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'Allproducts', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setFormData(productSnap.data());
          setLoading(false);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Convert quantity and price to numbers
    const numericFields = ['quantity', 'price'];
    let newValue = value;
    
    if (numericFields.includes(name)) {
      newValue = Number(value); // Convert to number
    }
  
    if (name === 'image' && files.length > 0) {
      setNewImage(files[0]); // Set new image file
    } else {
      setFormData({
        ...formData,
        [name]: newValue, // Set the correct value type
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newImage) {
        // Check if the current image is an external URL
        const isExternalUrl = formData.image && (formData.image.startsWith('http://') || formData.image.startsWith('https://'));
  
        // Only attempt to delete the old image if it's not an external URL
        if (formData.image && !isExternalUrl) {
          const oldImageRef = ref(storage, formData.image);
          try {
            await deleteObject(oldImageRef);
          } catch (error) {
            // Handle the case where the image is not found in Firebase Storage
            if (error.code === 'storage/object-not-found') {
              console.log('Old image not found in Firebase Storage, proceeding with new image upload');
            } else {
              throw error; // Rethrow other errors
            }
          }
        }
  
        // Upload the new image
        const imageRef = ref(storage, `images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        const newImageUrl = await getDownloadURL(imageRef);
  
        // Update formData with the new image URL
        formData.image = newImageUrl;
      }
  
      // Update product details in Firestore
      const productRef = doc(db, 'Allproducts', id);
      await updateDoc(productRef, formData);
      // console.log('Product updated:', formData);
  
      // Redirect to products dashboard
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-62px)] overflow-y-auto bg-[#cbebce] shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-[#388e3c] mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Product Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full px-3 py-2 border rounded-md" />
        </div>
        {/* Display current image */}
        <div className="flex justify-between items-center h-[200px] ">
        {/* File Upload */}
        <div className="w-1/2">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className='w-1/2 border border-black'>
          <img src={formData.image} alt="No image found" className='w-[200px] h-[200px] object-contain' />
        </div>
        </div>
        {/* Other Fields */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md">
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
          <input type="number" id="quantity" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input type="number" id="price" name="price" min="0" step="0.01" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-[#388e3c] w-full text-white px-4 py-2 rounded-md hover:bg-[#2e7031] transition">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
