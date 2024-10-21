'use client'
import dynamic from 'next/dynamic';

const AddProductComponent = dynamic(() => import('@/app/components/AddProductComponent'), { ssr: false });

const AddProduct = () => {
  return (
    <AddProductComponent />
  );
};

export default AddProduct;
