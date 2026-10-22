import { NextResponse } from 'next/server';
import { createOrderServer, getDbOrders, getOrderById } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      items,
      customer,
      shippingAddress,
      couponCode,
      paymentMethod,
      paymentDetails,
      idempotencyKey,
      isGiftWrapped,
    } = body;

    const result = createOrderServer({
      items,
      customer,
      shippingAddress,
      couponCode,
      paymentMethod,
      paymentDetails,
      idempotencyKey,
      isGiftWrapped,
    });

    return NextResponse.json(
      {
        success: true,
        order: result.order,
        isDuplicate: result.isDuplicate,
        message: result.isDuplicate
          ? 'Existing order retrieved via idempotency key.'
          : 'Order successfully created and queued for dispatch.',
      },
      { status: result.isDuplicate ? 200 : 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 422 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id') || searchParams.get('trackingId');
  const phone = searchParams.get('phone');
  const email = searchParams.get('email');

  if (orderId) {
    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }
    return NextResponse.json({ order });
  }

  const allOrders = getDbOrders();
  let filtered = allOrders;

  if (phone) {
    filtered = filtered.filter(
      (o) => o.customer?.phone?.replace(/\D/g, '') === phone.replace(/\D/g, '')
    );
  }

  if (email) {
    filtered = filtered.filter(
      (o) => o.customer?.email?.toLowerCase() === email.toLowerCase()
    );
  }

  return NextResponse.json({ orders: filtered });
}
