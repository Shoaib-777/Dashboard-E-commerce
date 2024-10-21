// app/_error.js
'use client'
import Link from "next/link";

export default function CustomError({ statusCode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-yellow-600">{statusCode || "Error"}</h1>
      <h2 className="text-3xl md:text-5xl font-semibold mt-6 text-gray-800">An Error Occurred</h2>
      <p className="text-md md:text-xl mt-4 text-gray-600">
        {statusCode
          ? `A ${statusCode} error occurred on the server.`
          : "An error occurred on the client side."}
      </p>
      <Link href="/dashboard" className="mt-8 px-6 py-3 bg-yellow-600 text-white rounded-lg text-lg">
        Go Home
      </Link>
    </div>
  );
}