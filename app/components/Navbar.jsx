'use client'
import { usePathname,useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    const pathname2 = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const pathname = usePathname();
    const getTextColor = ()=>{
        if(pathname === "/dashboard") return "#000"
        else if(
            pathname.startsWith ("/dashboard/products/updateproduct") || pathname.startsWith ("/dashboard/products/addproduct") || pathname.startsWith ("/dashboard/staff")
    )return "#000"
    }
    const textColor = getTextColor()
    // Determine background color based on the pathname
    const getBgColor = () => {
        if (pathname === "/dashboard/products") return "#388e3c";
        else if (pathname === "/dashboard/users") return "#1976d2";
        else if (
            pathname === "/dashboard/orders" || 
            pathname.startsWith ("/dashboard/orders/orderdetails") || 
            pathname.startsWith ("/dashboard/orders/address")
        ) return "#f57c00";
        else if (pathname === "/dashboard/customersupport") return "#d32f2f";
        return "#ffffff"; 
    };
   
    const bgColor = getBgColor(); // Get the dynamic background color
    const formattedPathname = capitalizeFirstLetter(pathname.split('/').pop());

    const handleSearch = (e) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            params.set('q', e.target.value);
        } else {
            params.delete('q');
        }
        replace(`${pathname2}?${params}`);
    }

    return (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <div 
                style={{ backgroundColor: bgColor }} 
                className={`border border-gray-300 shadow-xl w-full container mx-auto px-2 md:px-0 md:pl-4 md:pr-10 mb-2 mt-1`}
            >
                <div className="flex justify-between items-center gap-2 sm:gap-4 py-1">
                    <div>
                        <h3 className="text-black text-xl font-semibold">{formattedPathname}</h3>
                    </div>
                    <div className="flex items-center w-2/3 h-10 pr-2 pl-1 border-2 border-gray-200 rounded-2xl">
                        <input  onChange={handleSearch} className="w-full px-2 py-1 outline-none mr-2 rounded-l-xl" type="text" placeholder="Search..." />
                        <FaSearch style={{ color: textColor}} className="text-xl text-center text-white cursor-pointer" />
                    </div>
                </div>
            </div>
            </Suspense>
        </>
    );
};

export default Navbar;
