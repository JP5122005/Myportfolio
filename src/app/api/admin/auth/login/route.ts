import { NextRequest, NextResponse } from 'next/server';

// Default admin password - in production, use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  let body;

  try {
    // Read the request body
    body = await request.json();
  } catch (error) {
    console.error('Failed to parse request body:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  try {
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

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
      secure: false, // Allow over HTTP in development
      sameSite: 'lax', // Changed from strict to lax for better compatibility
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
