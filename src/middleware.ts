import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Admin route accessed:', request.nextUrl.pathname); // Debug log
    
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      console.log('Allowing access to login page'); // Debug log
      return NextResponse.next();
    }

    // Check for auth token in cookies
    const authToken = request.cookies.get('admin-auth');
    console.log('Auth token present:', !!authToken); // Debug log
    console.log('Auth token value:', authToken?.value); // Debug log
    
    if (!authToken || authToken.value !== 'authenticated') {
      console.log('Redirecting to login - no valid auth token'); // Debug log
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    console.log('Auth token valid, allowing access'); // Debug log
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
