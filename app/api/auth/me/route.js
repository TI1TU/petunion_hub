import { NextResponse } from 'next/server';
import { validateAdminSession, getDbUsers } from '@/lib/db';

export async function GET(request) {
  const token =
    request.headers.get('authorization')?.replace('Bearer ', '') ||
    request.cookies.get('sz_user_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = validateAdminSession(token);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const users = getDbUsers();
  const user = users.find((u) => u.id === session.userId || u.email === session.email);

  return NextResponse.json({
    authenticated: true,
    user: user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          membershipTier: user.membershipTier,
          addresses: user.addresses || [],
        }
      : { email: session.email, name: session.name, role: session.role },
  });
}
