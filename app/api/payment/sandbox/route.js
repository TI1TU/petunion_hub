import { NextResponse } from 'next/server';
import { getOrderById, markOrderPaymentServer } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, orderId, simulatedOutcome = 'SUCCESS', transactionId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required.' }, { status: 400 });
    }

    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: `Order ${orderId} not found.` }, { status: 404 });
    }

    // 1. INITIATE PAYMENT
    if (action === 'initiate') {
      const paymentToken = `PAY_SBX_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      return NextResponse.json({
        success: true,
        orderId,
        paymentToken,
        amount: order.pricing.finalTotal,
        currency: 'INR',
        gateway: 'SHARMAZONE Sandbox Gateway (Delhi NCR)',
        status: 'READY_FOR_PAYMENT',
        availableSimulatedOutcomes: ['SUCCESS', 'FAILED', 'CANCELLED'],
      });
    }

    // 2. CONFIRM PAYMENT OUTCOME (CALLBACK / WEBHOOK HANDLER)
    if (action === 'confirm' || action === 'callback') {
      // Idempotency: If order is already paid, do not re-process
      if (order.paymentStatus === 'Paid' && simulatedOutcome === 'SUCCESS') {
        return NextResponse.json({
          success: true,
          idempotent: true,
          order,
          message: 'Payment already processed and verified on server.',
        });
      }

      const verifiedTxnId =
        transactionId || `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      const updatedOrder = markOrderPaymentServer(orderId, simulatedOutcome, verifiedTxnId);

      if (simulatedOutcome === 'SUCCESS') {
        return NextResponse.json({
          success: true,
          status: 'PAID',
          transactionId: verifiedTxnId,
          order: updatedOrder,
          message: 'Payment successfully captured and order confirmed.',
        });
      } else if (simulatedOutcome === 'FAILED') {
        return NextResponse.json({
          success: false,
          status: 'FAILED',
          order: updatedOrder,
          message: 'Payment failed at the banking network. Please retry.',
          retryAllowed: true,
        }, { status: 402 });
      } else if (simulatedOutcome === 'CANCELLED') {
        return NextResponse.json({
          success: false,
          status: 'CANCELLED',
          order: updatedOrder,
          message: 'Payment cancelled by customer.',
          retryAllowed: true,
        }, { status: 400 });
      }
    }

    // 3. RETRY PAYMENT
    if (action === 'retry') {
      if (order.paymentStatus === 'Paid') {
        return NextResponse.json({
          success: false,
          message: 'Order is already paid. Retry not required.',
        }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: 'Order ready for payment re-attempt.',
        orderId,
        amount: order.pricing.finalTotal,
      });
    }

    return NextResponse.json({ error: 'Invalid payment action.' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
