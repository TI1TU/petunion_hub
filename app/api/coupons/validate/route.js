import { NextResponse } from 'next/server';
import { validateCouponServer } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json({
        valid: false,
        message: 'Coupon code is required.',
      }, { status: 400 });
    }

    const result = validateCouponServer(code, Number(subtotal || 0));
    return NextResponse.json(result, { status: result.valid ? 200 : 422 });
  } catch (err) {
    return NextResponse.json({
      valid: false,
      message: 'Failed to validate coupon: ' + err.message,
    }, { status: 500 });
  }
}
