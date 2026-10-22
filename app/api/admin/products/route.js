import { NextResponse } from 'next/server';
import { validateAdminSession, getDbProducts, saveDbProduct, deleteDbProduct } from '@/lib/db';

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

  const products = getDbProducts();
  return NextResponse.json({ products });
}

export async function POST(request) {
  const session = checkAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Product name and price are required.' },
        { status: 400 }
      );
    }

    const saved = saveDbProduct(body);
    return NextResponse.json({
      success: true,
      product: saved,
      message: 'Product saved successfully.',
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = checkAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required.' }, { status: 400 });
  }

  const success = deleteDbProduct(id);
  if (!success) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Product removed.' });
}
