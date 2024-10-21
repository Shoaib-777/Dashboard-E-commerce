// app/500.js
'use client'
import Link from "next/link";

export default function Custom500() {
    const excalmation = "!"
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-red-600">500</h1>
      <h2 className="text-3xl md:text-5xl font-semibold mt-6 text-gray-800">Server Error</h2>
      <p className="text-md md:text-xl mt-4 text-gray-600">Oops{excalmation} Something went wrong on our end.</p>
      <Link href="/dashboard" className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg text-lg">
        Go Home
      </Link>
    </div>
  );
}