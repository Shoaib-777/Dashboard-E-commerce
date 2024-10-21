import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Layout = ({children}) => {
    

    return (
        <>
            <div className="flex gap-2">
                <div className="h-screen">
                    <Sidebar />
                </div>
                <div className="overflow-auto w-full mx-1">
                    <Navbar/>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout
