import { DeleteUser, FetchUsers } from "@/app/lib/FetchUsers";
import Pagination from "@/app/components/Pagination";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

const Users = async ({ searchParams }) => {
  const q = searchParams?.q || ''; // Get the search query from query params
  const page = parseInt(searchParams.page) || 1; // Get the current page from query params
  const usersPerPage = 6;
  const { users, totalUsers } = await FetchUsers(page, usersPerPage, q); // Pass the search query

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="p-4 bg-[#1976d2] h-[calc(100vh-62px)] w-full overflow-y-auto">
      <div className="bg-white border border-gray-200 shadow-md rounded-lg w-full overflow-x-auto">
        <table className="min-w-full overflow-hidden">
          <thead>
            <tr className="bg-[#c5e1f2] border-b border-gray-200">
              <th className="py-3 px-6 text-left">S No</th>
              <th className="py-3 px-6 text-left">Profile</th>
              <th className="py-3 px-6 text-left">Email Id</th>
              <th className="py-3 px-6 text-left">Phone No</th>
              <th className="py-3 px-6 text-left">Joined At</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-[#d4e7f4] even:bg-[#b0cee0]"
                >
                  <td className="py-2 px-5 ">{(page - 1) * usersPerPage + i + 1}</td>
                  <td className="py-2 px-5 flex items-center min-w-[200px]">
                    <img
                      src={
                        user.img ||
                        '/Images/no-user.jpg'
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span>{user.username}</span>
                  </td>
                  <td className="py-2 px-5 text-nowrap">{user.email}</td>
                  <td className="py-2 px-5 text-nowrap">{user.phone}</td>
                  <td className="py-2 px-5 text-center">{formatDate(user.createdAt)}</td>
                  <td className="py-2 px-2 text-nowrap text-center">
                    <form action={DeleteUser}>
                      <input type="hidden" id="id" name="id" value={user._id} />
                      <button className="text-red-500 hover:text-red-800">
                        <RiDeleteBin6Line className="w-6 h-6" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-black font-bold">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Client-side Pagination */}
        <Pagination totalPages={totalPages} currentPage={page} />
      </div>
    </div>
    </Suspense>
  );
};

export default Users;
