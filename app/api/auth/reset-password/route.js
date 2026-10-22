import { NextResponse } from 'next/server';
import { resetPassword } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, newPassword } = body;
    const result = resetPassword(token, newPassword);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
