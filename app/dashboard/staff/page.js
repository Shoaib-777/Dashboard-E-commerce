import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { FetchStaff } from "@/app/lib/FetchStaff";
import { DeleteStaffMember } from "@/app/lib/DeleteStaffMember";
import Pagination from "@/app/components/Pagination";
import { cookies } from "next/headers";
import { fetchUserByEmail } from "@/app/lib/FetchSingleUser";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';


const Staff = async ({ searchParams }) => {
  
  const cookieStore = cookies();
  const userEmail = cookieStore.get('userEmail')?.value || '';
  console.log("user email got bro", userEmail)
  const q = searchParams?.q || "";
  const page = parseInt(searchParams.page) || 1; // Get current page from search params
  const pageSize = 6;
  const { staffData, totalUsers } = await FetchStaff(page, pageSize, q); // Fetch paginated staff data
  const totalPages = Math.ceil(totalUsers / pageSize);
  const fetchuserDetail = await fetchUserByEmail(userEmail)

    
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="container mx-auto  p-4 bg-white border border-gray-200 shadow-xl ">

      <div className="flex items-center cursor-pointer w-fit gap-2 bg-blue-600 px-4 py-2 mb-2 hover:shadow-inner transition-all duration-100 hover:bg-blue-800 rounded-lg">
        <Link className="flex justify-center items-center gap-x-2" href={'/dashboard/staff/addmember'}><button className="text-white font-semibold">Add Member</button><FaPlus className="text-white text-lg" /> </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3  text-center">S.No</th>
              <th className="py-3 px-3 text-center">Profile</th>
              <th className="py-3 px-3 text-left">E-mail</th>
              <th className="py-3 px-3 text-left">Phone</th>
              <th className="py-3 px-3 text-center">User Role</th>
              <th className="py-3 px-3 text-left">User Status</th>
              <th className="py-3 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {staffData.length > 0 ? (
              staffData.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 text-center whitespace-nowrap">{(page - 1) * pageSize + index + 1}</td>
                  <td className="py-3 px-3 text-left">
                  <div className="flex flex-col">
                      <img src={user.profile || "/Images/no-user.jpg"} alt={user.username} className="w-10 h-10 rounded-full object-cover mx-auto" />
                      <h3 className="text-nowrap text-center">{user.username}</h3>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-left">{user.email}</td>
                  <td className="py-3 px-3 text-left">{user.phone}</td>
                  <td className="py-3 px-3 text-center">{user.role}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${user.status === "Active"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center space-x-2 ">
                      <Link href={`/dashboard/staff/updatemember/${user.id}`}>
                        <button className="text-blue-500 hover:text-blue-700">
                          <BiSolidEdit className="w-6 h-6" />
                        </button>
                      </Link>
                      <form action={DeleteStaffMember}>
                        <input type="hidden" name="id" id="id" value={user.id} />
                        <button className=" text-red-500 hover:text-red-700 mb-1 relative group " disabled={user.email === userEmail || fetchuserDetail.role === "Employee"}>
                          <RiDeleteBin6Line
                            className={`${user.email === userEmail || fetchuserDetail.role === "Employee" ?  "cursor-not-allowed" : ""} w-6 h-6`}
                          />
                          {/* <span className={`${user.email === userEmail ?  "hidden group-hover:block":"hidden"} absolute -left-[160px] -top-8 text-red-600 border border-gray-300 bg-white shadow-2xl font-bold px-1 py-1 w-[200px]`}>
                            {user.email === userEmail ? (
                              "You Cannot Delete Your Self"
                            ):(
                              {user.role === "Employee" ? (
                                "Employees Cannot Delete Anyone"
                              ):(
                                ""
                              )}
                            )}
                          </span> */}
                          <span
                            className={`${user.email === userEmail || fetchuserDetail.role === "Employee"
                                ? "hidden group-hover:block"
                                : "hidden"
                              } absolute -left-[160px] -top-8 text-red-600 border border-gray-300 bg-white shadow-2xl font-bold px-1 py-1 w-[200px]`}
                          >
                            {user.email === userEmail
                              ? "You Cannot Delete Yourself"
                              : fetchuserDetail.role === "Employee"
                                ? "Employees Cannot Able To Delete Anyone"
                                : ""}
                          </span>

                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) :
              (
                <tr>
                  <td colSpan="9" className="py-4 text-center bg-white text-black font-bold">
                    No Staff Member Found
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

export default Staff;
