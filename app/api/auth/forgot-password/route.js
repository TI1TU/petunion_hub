import { NextResponse } from 'next/server';
import { requestPasswordReset } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = requestPasswordReset(body.email);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ success: true, message: 'Request processed.' });
  }
}
