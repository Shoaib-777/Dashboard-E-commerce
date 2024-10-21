import { DeleteProduct } from "@/app/lib/DeleteStaffMember";
import { FetchProducts } from "@/app/lib/FetchProducts";
import Link from "next/link";
import { Suspense } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

export const dynamic = 'force-dynamic';


const Products = async({searchParams}) => {
  const q = searchParams?.q || "";
  const products = await FetchProducts(q)
  // const products = [
  //   {
  //     id: 1,
  //     title: 'Product 1',
  //     description: 'This is the first product',
  //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', // replace with your image path
  //     category: 'Category 1',
  //   },
  //   {
  //     id: 2,
  //     title: 'Mens Casual Premium Slim Fit T-Shirts',
  //     description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
  //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', // replace with your image path
  //     category: 'men s clothing',
  //   },
  //   {
  //     id: 3,
  //     title: 'Product 3',
  //     description: 'This is the third product',
  //     image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', // replace with your image path
  //     category: 'Category 3',
  //   },
  // ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="container mx-auto p-4 bg-[#388e3c] h-[calc(100vh-62px)] overflow-y-auto">
      <div className="flex items-center cursor-pointer w-fit gap-2 bg-blue-600 px-4 py-2 mb-2 hover:shadow-inner transition-all duration-100  hover:bg-blue-800 rounded-lg">
      <Link className="flex items-center space-x-2 " href={'/dashboard/products/addproduct'}><button className="text-white font-semibold">Add Product</button><FaPlus className="text-white text-lg font-bold "/></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#e8f5e9]">
            <tr>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-700 border-r border-[#388e3c]">ID</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-700 border-r border-[#388e3c]">Title</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-700 border-r border-[#388e3c]">Description</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-700 border-r border-[#388e3c]">Image</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-700 border-r border-[#388e3c]">Price</th>
              <th className="px-2 py-3 text-left text-sm font-bold text-gray-700 border-r border-[#388e3c]">Quantity</th>
              <th className="px-2 py-3 text-center text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
             products.map((product, index) => (
              <tr key={product.id} className="border-b even:bg-[#e0f0e2] hover:bg-[#aae3ac] ">
                <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-[#388e3c]">{index + 1}</td>
                <td className="px-2 py-1 md:px-4 md:py-3 min-w-[150px] max-w-[200px] md:max-w-[300px] whitespace-nowrap text-sm text-gray-700 text-wrap border-r border-[#388e3c]">{product.title}</td>
                <td className="px-2 py-1 md:px-4 md:py-3 min-w-[300px] max-w-[330px] md:max-w-[400px] whitespace-nowrap text-wrap text-sm text-gray-500 border-r border-[#388e3c]">{product.description}</td>
                <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-sm border-r border-[#388e3c]">
                  <img src={product.image} alt={product.title} className="h-[100px] w-[100px] p-[1px] object-contain rounded-md" />
                  <div className="text-red-700 text-center font-semibold mt-2">{product.category}</div> {/* Category under the image */}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-3 text-center whitespace-nowrap text-sm text-gray-700 border-r border-[#388e3c]">${product.price}</td>
                <td className={`px-2 py-1 md:px-4 md:py-3 text-center whitespace-nowrap text-sm border-r border-[#388e3c] ${product.quantity < 10 ?'text-red-600' : 'text-gray-700'}`}> {product.quantity || 12}</td>
                <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-sm">
                <div className="flex items-center justify-center space-x-2">
                    <Link href={`/dashboard/products/updateproduct/${product.id}`} >
                      <button className="text-blue-500 hover:text-blue-700">
                        <BiSolidEdit className="w-6 h-6" />
                      </button>
                    </Link>
                    <form action={DeleteProduct}>
                      <input type="hidden" name="id" id="id" value={product.id} />
                    <button className="text-red-500 hover:text-red-700 mb-1">
                      <RiDeleteBin6Line className="w-6 h-6" />
                    </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))
          ):(
            <tr>
                <td colSpan="7" className="py-4 text-center bg-white text-black font-bold">
                  No Product Found
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
    </Suspense>
  );
};

export default Products;
