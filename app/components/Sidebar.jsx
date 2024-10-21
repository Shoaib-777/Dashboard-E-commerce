'use client';
import { useEffect, useState } from "react";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { TbSquareArrowRightFilled, TbSquareArrowLeftFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth, db } from "../lib/firebaselib";
import { signOut } from "firebase/auth";
import { FiLogOut } from 'react-icons/fi';
import { collection, getDocs, query, where } from "firebase/firestore";
import Cookies from "js-cookie";
import axios from "axios";

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);
  const [email, setEmail] = useState('')
  const [userData,setUserData]=useState(null)
  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch the cookie
      const cookieData = Cookies.get('loggedIn');

      // Check if the cookie exists
      if (cookieData) {
        // Parse the cookie data if it exists
        const { userEmailId } = JSON.parse(cookieData);
        setEmail(userEmailId);
        updateEmail(userEmailId)
        // console.log("iam email id",userEmailId);

        // Fetch user data using async/await
        try {
          const userData = await GetUserData(userEmailId);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const updateEmail = async (email) => {
    try {
        const response = await axios.post('/api/userlogged', { email: email });
        console.log(response.data.message); // Log success message
    } catch (error) {
        console.error("Error updating email:", error);
    }
};

  const GetUserData = async (email) => {
    try {
      const staffRef = collection(db, "staff"); 
      const q = query(staffRef, where("email", "==", email)); // Query Firestore by email
  
      const querySnapshot = await getDocs(q); // Get the matching documents
  
      if (querySnapshot.empty) {
        console.log("No matching documents found.");
        return null;
      }
  
      // Assuming you're interested in just the first match
      const staffDoc = querySnapshot.docs[0];
      const staffData = staffDoc.data();
      setUserData(staffData)  
    } catch (error) {
      console.error("Error searching by email:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("loggedIn");
      // Sign-out successful
      console.log("User signed out");
      router.push('/login')
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <div className="relative">
        <div className={`border border-black h-[100vh] px-2 bg-[#f5f5f5] md:w-[300px] ${showSideBar ? 'w-[250px]' : 'w-[60px]'} transition-all duration-300`}>
          <div className={`flex py-1 gap-4 md:px-4 items-center ${showSideBar ? 'px-4' :'px-0'}`}>
            <div className="aw-10 h-10 rounded-full md:h-[50px] md:w-[50px]">
              <img
                src={userData ? userData.profile : "/Images/no-user.jpg"}
                alt="Profile"
                className=" w-10 h-10 md:w-[50px] md:h-[50px] border border-black object-cover rounded-full"
              />
            </div>
            <div className={`${showSideBar ? 'block' : 'hidden'} md:block`}>
              <h3 className="font-bold text-xl">Hello {userData ? userData.username : "User"}!</h3>
              <h3 className="text-wrap text-gray-700">{userData ? userData.email : "Example@gmail.com"}</h3>
            </div>
          </div>
          {/* {sideBar For Small Devices} */}
          <div className={`${showSideBar ? 'hidden' : 'block'} md:hidden flex justify-center items-center mt-[5rem]`}>
            <ul>
              <Link href={'/dashboard/products'}>
                <li className={`${pathname === '/dashboard/products' ? 'bg-[#e8f5e9]' : 'bg-none'} cursor-pointer  flex items-center justify-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <RiShoppingBag4Fill className="w-8 h-8 text-[#388e3c]" />
                </li>
              </Link>
              <Link href={'/dashboard/users'}>
                <li className={`${pathname === '/dashboard/users' ? 'bg-[#e3f2fd]' : 'bg-none'} cursor-pointer flex items-center justify-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <FaUsers className="w-9 h-9 text-[#1976d2]" />
                </li>
              </Link>
              <Link href={'/dashboard/orders'}>
                <li className={`${pathname === '/dashboard/orders' ? 'bg-[#fff3e0]' : 'bg-none'} cursor-pointer flex items- justify-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <FaClipboardList className="w-9 h-9 text-[#f57c00]" />
                </li>
              </Link>
              <Link href={'/dashboard/customersupport'}>
                <li className={`${pathname === '/dashboard/customersupport' ? 'bg-[#ffebee]' : 'bg-none'} cursor-pointer flex items-center justify-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <BiSupport className="w-9 h-9 text-[#d32f2f]" />
                </li>
              </Link>
              <Link href={'/dashboard/staff'}>
                <li className={`${pathname === '/dashboard/staff' ? 'bg-[#D3D3D3]' : 'bg-none'} cursor-pointer flex items-center justify-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <RiAdminFill className="w-9 h-9 text-[#708090]" />
                </li>
              </Link>
              <li>
                <button onClick={handleSignOut} className="flex items-center px-2 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-300"><FiLogOut className=" w-7 h-7" /></button>
              </li>
            </ul>
          </div>

          {/* Sidebar for md or greate screen */}
          <div className={`${showSideBar ? 'block' : 'hidden'} mt-[3rem] md:block`}>
            <ul className="px-4">
              <Link href={'/dashboard/products'}>
                <li className={`${pathname === '/dashboard/products' ? 'bg-[#e8f5e9]' : 'bg-none'} cursor-pointer flex items-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <RiShoppingBag4Fill className="w-9 h-9 text-[#388e3c]" />
                  <span className="text-[#333333] text-xl font-bold">Products</span>
                </li>
              </Link>
              <Link href={'/dashboard/users'}>
                <li className={`${pathname === '/dashboard/users' ? 'bg-[#e3f2fd]' : 'bg-none'} cursor-pointer flex items-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <FaUsers className="w-9 h-9 text-[#1976d2]" />
                  <span className="text-[#333333] text-xl font-bold">Users</span>
                </li>
              </Link>
              <Link href={'/dashboard/orders'}>
                <li className={`${pathname === '/dashboard/orders' ? 'bg-[#fff3e0]' : 'bg-none'} cursor-pointer flex items-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <FaClipboardList className="w-9 h-9 text-[#f57c00]" />
                  <span className="text-[#333333] text-xl font-bold">Orders</span>
                </li>
              </Link>
              <Link href={'/dashboard/customersupport'}>
                <li className={`${pathname === '/dashboard/customersupport' ? 'bg-[#ffebee]' : 'bg-none'} cursor-pointer flex items-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <BiSupport className="w-9 h-9 text-[#d32f2f]" />
                  <span className="text-[#333333] text-xl font-bold">Customer Support</span>
                </li>
              </Link>
              <Link href={'/dashboard/staff'}>
                <li className={`${pathname === '/dashboard/staff' ? 'bg-[#D3D3D3]' : 'bg-none'} cursor-pointer flex items-center rounded-md px-1 py-1 border border-black gap-4 mb-4`}>
                  <RiAdminFill className="w-9 h-9 text-[#708090]" />
                  <span className="text-[#333333] text-xl font-bold">Staff</span>
                </li>
              </Link>
              <li>
              <button
              onClick={handleSignOut} 
                  className="flex items-center px-2 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300 w-full"
                >
                  <FiLogOut className="mr-4" size={30}  />
                  <span className="text-white text-xl font-bold">Log Out</span>
                </button>
              </li>
            </ul>
          </div>


          {/* Additional content */}
          <div className="absolute bottom-20 w-[calc(100%-16%)] flex justify-end  md:hidden">
            {showSideBar ? (
              <TbSquareArrowLeftFilled onClick={() => setShowSideBar(false)} className="cursor-pointer w-10 h-10 fill-yellow-600" />
            ) : (
              <TbSquareArrowRightFilled onClick={() => setShowSideBar(true)} className="cursor-pointer w-10 h-10 fill-yellow-600" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
