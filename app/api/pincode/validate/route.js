import { NextResponse } from 'next/server';
import { validateDelhiNcrPincode, SAMPLE_DELHI_NCR_PINCODES } from '@/lib/pincode';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get('pincode') || searchParams.get('pin');

  if (!pin) {
    return NextResponse.json({
      serviceable: false,
      message: 'Pincode parameter is required.',
      serviceArea: 'Delhi, Noida, Gurugram, Ghaziabad (Delhi NCR)',
      samples: SAMPLE_DELHI_NCR_PINCODES,
    }, { status: 400 });
  }

  const result = validateDelhiNcrPincode(pin);
  return NextResponse.json(result, { status: result.serviceable ? 200 : 422 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const pin = body.pincode || body.pin;
    const result = validateDelhiNcrPincode(pin);
    return NextResponse.json(result, { status: result.serviceable ? 200 : 422 });
  } catch (err) {
    return NextResponse.json({
      serviceable: false,
      message: 'Invalid request payload.',
    }, { status: 400 });
  }
}
