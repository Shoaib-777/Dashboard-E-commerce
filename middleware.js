// middleware.js
import { NextResponse } from 'next/server';

// Define the protected routes that require login
const protectedRoutes = ['/dashboard'];

export function middleware(request) {
  const loggedIn = request.cookies.get('loggedIn');
  const url = request.nextUrl.clone();

  // If the user is not logged in and trying to access protected routes (e.g., dashboard)
  if (!loggedIn && protectedRoutes.some(route => url.pathname.startsWith(route))) {
    url.pathname = '/login'; // Redirect to login page
    return NextResponse.redirect(url);
  }

  // If the user is logged in and tries to access the login page, redirect to the dashboard
  if (loggedIn && url.pathname === '/login') {
    url.pathname = '/dashboard'; // Redirect to dashboard
    return NextResponse.redirect(url);
  }
  if(url.pathname === '/'){
    url.pathname = '/dashboard';
    return NextResponse.redirect(url)
  }

  // Allow the request to proceed if it doesn't match the above conditions
  return NextResponse.next();
}

// Specify the routes where the middleware should apply
export const config = {
  matcher: ['/dashboard', '/login'], // Protect these routes
};
