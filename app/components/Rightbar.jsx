import Image from "next/image";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className="fixed">
      <div className="bg-gradient-to-t from-[#182237] to-[#253352] p-5 rounded-lg mb-5 relative">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          <Image className="object-contain opacity-20" src="/astronaut.png" alt="" fill />
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="text-white text-lg font-semibold">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="text-gray-400 font-medium text-xs">Takes 4 minutes to learn</span>
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5d57c9] text-white rounded-md">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-t from-[#182237] to-[#253352] p-5 rounded-lg mb-5 relative">
        <div className="flex flex-col gap-6">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3 className="text-white text-lg font-semibold">
            New server actions are available, partial pre-rendering is coming up!
          </h3>
          <span className="text-gray-400 font-medium text-xs">Boost your productivity</span>
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5d57c9] text-white rounded-md">
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
