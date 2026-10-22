import { NextResponse } from 'next/server';
import { verifyAdminCredentials, validateAdminSession, ADMIN_ALLOWED_EMAILS } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const result = verifyAdminCredentials(email, password);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      token: result.token,
      user: result.user,
      message: 'Admin authorization successful.',
    });

    response.cookies.set('sz_admin_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  const token =
    request.headers.get('authorization')?.replace('Bearer ', '') ||
    request.cookies.get('sz_admin_token')?.value;

  const session = validateAdminSession(token);
  if (!session) {
    return NextResponse.json(
      { authenticated: false, message: 'Invalid or expired administrator session.' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: { email: session.email, role: session.role },
    allowlist: ADMIN_ALLOWED_EMAILS,
  });
}
