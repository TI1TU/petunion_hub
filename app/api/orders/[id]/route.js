import { NextResponse } from 'next/server';
import { getOrderById } from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, order });
}
