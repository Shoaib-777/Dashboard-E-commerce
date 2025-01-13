
export default function Home() {
  return (
   <div className="container mx-auto flex justify-center items-center h-screen">
    <div className="text-2xl"><span className="text-red-500 font-semibold">Go to <a className="underline decoration-blue-600 text-blue-700" href={'/dashboard'}>Dashboard</a></span></div>
   </div> 
  );
}
