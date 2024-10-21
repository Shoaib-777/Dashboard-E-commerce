import Pagination from "@/app/components/Pagination";
import { DeleteOrder, FetchOrders } from "@/app/lib/FetchOrders";
import Link from "next/link";
import { Suspense } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export const dynamic = 'force-dynamic';


const Orders = async ({ searchParams }) => {
  const q = searchParams?.q || ''; // Get the search query from query params

  const page = parseInt(searchParams.page) || 1; // Get the current page from query params
  const OrdersPerPage = 6;
  const { orders, totalOrders } = await FetchOrders(page, OrdersPerPage,q)

  // Fetch the users for the current page and the total user count

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalOrders / OrdersPerPage);
  // const ordersData = [
  //   {
  //     sno: 1,
  //     fullName: "John Doe anthony manlk",
  //     mobileNo: "1234567890",
  //     state: "California",
  //     fullAddress: "1234 Elm Street, Some City, CA 12345",
  //     orderDetails: "Product A, Product B",
  //     amount: "$100",
  //     orderAt: "2024-09-24T14:22:30.076+00:00"
  //   },
  //   {
  //     sno: 2,
  //     fullName: "John Doe anthony manlk",
  //     mobileNo: "1234567890",
  //     state: "California",
  //     fullAddress: "1234 Elm Street, Some City, CA 12345",
  //     orderDetails: "Product A, Product B",
  //     amount: "$100",
  //     orderAt: "2024-10-24T14:22:30.076+00:00"
  //   },
  // ];


  // Function to calculate the total amount for each order
  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => {
      return total + (product.productPrice * product.productQuantity);
    }, 0).toFixed(2); // Fix the total to two decimal places
  };

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
  };

  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>

      <div className="p-4 bg-[#f57c00] h-[calc(100vh-62px)] overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-[#f3e3c9] text-left">
                <th className="px-4 py-2 border-r border-[#f57c00]">S.No</th>
                <th className="px-4 py-2 border-r border-[#f57c00]">Full Name</th>
                <th className="px-4 py-2 border-r border-[#f57c00]">Mobile No</th>
                <th className="px-4 py-2 border-r border-[#f57c00]">State</th>
                <th className="px-4 py-2 border-r border-[#f57c00]">Full Address</th>
                <th className="px-4 py-2 border-r border-[#f57c00]">Order Details</th>
                <th className="px-4 py-2 border-r border-[#f57c00]">Amount</th>
                <th className="px-4 py-2 border-r border-[#f57c00] text-center">Order At</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
               orders.map((order, index) => (
                <tr key={order._id} className="bg-white hover:bg-[#ec9f52] even:bg-[#f3bd87]">
                  <td className="px-4 py-2 border-r border-[#f57c00]">{(page - 1) * OrdersPerPage + index + 1}</td>
                  <td className="px-4 py-2 border-r border-[#f57c00] text-nowrap">{order.address.fullName}</td>
                  <td className="px-4 py-2 border-r border-[#f57c00]">{order.address.mobileNo}</td>
                  <td className="px-4 py-2 border-r border-[#f57c00]">{order.address.state}</td>
                  <td className="px-4 py-2 border-r border-[#f57c00] font-bold">
                    <Link href={`/dashboard/orders/address/${order._id}`}>
                      <button className="text-blue-600 hover:underline">View</button>
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-r border-[#f57c00] font-bold">
                    <Link href={`/dashboard/orders/orderdetails/${order._id}`}>
                      <button className="text-blue-600 hover:underline">View</button>
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-r border-[#f57c00]">${calculateTotalAmount(order.products)}</td>
                  <td className="px-4 py-2 text-balance text-center border-r border-[#f57c00]">{formatDate(order.createdAt)}</td> {/* Format the date here */}
                  <td className="px-1 py-2 text-center">
                    <form action={DeleteOrder}>
                      <input type="hidden" name="id" id="id" value={order._id} />
                      <button className="text-red-500 hover:text-red-800">
                        <RiDeleteBin6Line className="w-6 h-6" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="9" className="py-4 text-center bg-white text-black font-bold">
                  No Order Found
                </td>
              </tr>
            )}
            </tbody>
          </table>
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      </div>
      </Suspense>
    </>
  );
}

export default Orders;
