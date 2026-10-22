import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = loginUser(body);
    const response = NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
      message: 'Logged in successfully.',
    });

    response.cookies.set('sz_user_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 86400,
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 401 });
  }
}
