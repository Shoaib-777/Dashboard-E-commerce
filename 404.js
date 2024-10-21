'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <Image 
        src="/public/Images/page-not-found.jpg"
        alt="Page not found" 
        width={500} 
        height={400}
        className="mb-6"
      />
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for does not exist.</p>
      <Link href="/dashboard">
        <a className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          Go back home
        </a>
      </Link>
    </div>
  );
}
