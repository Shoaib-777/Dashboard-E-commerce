import Pagination from "@/app/components/Pagination";
import { DeleteCustomerSupport, FetchCustomerSupport } from "@/app/lib/FetchCustomerSupport";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';


const CustomerSupport = async({ searchParams }) => {
  const q = searchParams?.q || '';
  const page = parseInt(searchParams.page) || 1; // Get the current page from query params
  const usersPerPage = 6;
  const {messages ,totalUsers } = await FetchCustomerSupport(page,usersPerPage,q)

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // const messages = [
  //   {
  //     sno: 1,
  //     username: "Shaik Mohammed Shoaib",
  //     email: "shaikmohammed777@gmail.com",
  //     phone: "123-456-7890",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae commodi praesentium iste earum sit magnam cumque cupiditate! Minus itaque rem hic eligendi blanditiis quia! Eum error quae facere nemo debitis!",
  //     completed: "Solved",
  //   },{
  //     sno: 2,
  //     username: "Shaik Mohammed Shoaib",
  //     email: "shaikmohammed777@gmail.com",
  //     phone: "123-456-7890",
  //     message:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae commodi praesentium iste earum sit magnam cumque cupiditate! Minus itaque rem hic eligendi blanditiis quia! Eum error quae facere nemo debitis!",
  //     completed: "Solved",
  //   },
  // ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="p-4 bg-[#d32f2f] h-[calc(100vh-62px)] w-full">

      <div className="bg-white border border-gray-200 shadow-md rounded-lg w-full overflow-x-auto">
        <table className="min-w-full overflow-hidden">
          <thead className="">
            <tr className="bg-[#f2b8b8] border-b border-gray-200">
              <th className="py-3 px-6 text-left border-r border-[#d32f2f]">S No</th>
              <th className="py-3 px-6 text-left border-r border-[#d32f2f]">User Name</th>
              <th className="py-3 px-6 text-left border-r border-[#d32f2f]">Email Id</th>
              <th className="py-3 px-6 text-left border-r border-[#d32f2f]">Phone No</th>
              <th className="py-3 px-6 text-left border-r border-[#d32f2f]">Message</th>
              <th className="py-3 px-6 text-left">Completed</th>
            </tr>
          </thead>
          <tbody className="">
            {messages.length > 0 ? (
             messages.map((v,i) => (
              <tr key={v._id} className="border-b border-gray-200 hover:bg-[#f7f2f3] even:bg-[#f6caca]">
                <td className="py-2 px-5 border-r border-[#d32f2f]">{(page - 1) * usersPerPage + i + 1}</td>
                <td className="py-2 px-5 border-r border-[#d32f2f]">{v.username}</td>
                <td className="py-2 px-5 border-r border-[#d32f2f]">{v.email}</td>
                <td className="py-2 px-5 border-r border-[#d32f2f] text-nowrap">{v.phone}</td>
                <td className="py-2 px-2 border-r border-[#d32f2f] min-w-[300px] md:min-w-max">{v.message}</td>
                <td className="py-2 px-5">
                  <form action={DeleteCustomerSupport}>
                    <input type="hidden" name="id" id="id" value={v._id} />
                    <button className="bg-[#d32f2f] text-white px-4 py-1 rounded-lg hover:bg-[#b71c1c]">
                      Completed
                    </button>
                  </form>
                </td>
              </tr>
            ))
          ) :(
            <tr>
                <td colSpan="6" className="py-4 text-center text-black font-bold">
                  No Customer Support Request Found
                </td>
              </tr>
          )}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} currentPage={page} />
      </div>
    </div>
    </Suspense>
  );
};

export default CustomerSupport;
