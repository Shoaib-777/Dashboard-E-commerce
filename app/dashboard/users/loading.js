const Loading = () => {
    return (
      <div className="flex items-center justify-center h-full p-4 bg-[#1976d2]">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v1a7 7 0 100 14v1a8 8 0 01-8-8z"
            />
          </svg>
          <p className="mt-4 text-white">Loading Users...</p>
        </div>
      </div>
    );
  };
  
  export default Loading;
  