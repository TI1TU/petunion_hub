import { NextResponse } from 'next/server';
import { validateAdminSession, getDbOrders, updateOrderStatusServer } from '@/lib/db';

function checkAuth(request) {
  const token =
    request.headers.get('authorization')?.replace('Bearer ', '') ||
    request.cookies.get('sz_admin_token')?.value;
  return validateAdminSession(token);
}

export async function GET(request) {
  const session = checkAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  const orders = getDbOrders();
  return NextResponse.json({ orders });
}

export async function PUT(request) {
  const session = checkAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { orderId, status, trackingNotes } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId and status are required.' }, { status: 400 });
    }

    const updated = updateOrderStatusServer(orderId, status, trackingNotes);
    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
