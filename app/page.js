
export default function Home() {
  return (
   <div className="container mx-auto flex justify-center items-center h-screen">
    <div className="text-2xl">No Page Found Sorry .... <span className="text-red-500 font-semibold">Go to <a className="hover:underline decoration-red-500 text-red-700" href={'/dashboard'}>Dashboard</a></span></div>
   </div> 
  );
}
