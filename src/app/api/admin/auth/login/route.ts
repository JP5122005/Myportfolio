import { NextRequest, NextResponse } from 'next/server';

// Default admin password - in production, use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    console.log('Login attempt received'); // Debug log
    console.log('Password matches:', password === ADMIN_PASSWORD); // Debug log

    if (password !== ADMIN_PASSWORD) {
      console.log('Invalid password provided'); // Debug log
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    console.log('Password correct, setting cookie'); // Debug log

    // Create response with auth cookie
    const response = NextResponse.json({ success: true });
    
    // Set secure HTTP-only cookie for authentication
    response.cookies.set('admin-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    console.log('Cookie set, returning success response'); // Debug log
    return response;
  } catch (error) {
    console.error('Login API error:', error); // Debug log
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
