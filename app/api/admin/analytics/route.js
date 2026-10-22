import { NextResponse } from 'next/server';
import { validateAdminSession, getDbOrders, getDbProducts, getDbCoupons } from '@/lib/db';

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
  const products = getDbProducts();
  const coupons = getDbCoupons();

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'Paid' || o.paymentMethod === 'cod')
    .reduce((sum, o) => sum + (o.pricing?.finalTotal || 0), 0);

  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  // Regional breakdown across Delhi NCR
  const regionalBreakdown = {
    Delhi: 0,
    Noida: 0,
    Gurugram: 0,
    Ghaziabad: 0,
  };

  orders.forEach((o) => {
    const city = o.shippingAddress?.city;
    if (city && regionalBreakdown[city] !== undefined) {
      regionalBreakdown[city] += 1;
    }
  });

  return NextResponse.json({
    metrics: {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      pendingOrders,
      deliveredOrders,
      totalProducts: products.length,
      activeCoupons: coupons.filter((c) => c.active).length,
    },
    regionalBreakdown,
    recentOrders: orders.slice(0, 10),
  });
}
