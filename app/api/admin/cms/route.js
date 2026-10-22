import { NextResponse } from 'next/server';
import { validateAdminSession, getDbCmsContent, saveDbCmsContent, rollbackDbCmsContent } from '@/lib/db';

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

  const cms = getDbCmsContent();
  return NextResponse.json({ cms });
}

export async function PUT(request) {
  const session = checkAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const cmsPayload = body.cms || body;
    const updated = saveDbCmsContent(cmsPayload);
    return NextResponse.json({
      success: true,
      cms: updated,
      message: 'Storefront CMS published successfully to live customer storefront.',
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = checkAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (body.action === 'rollback') {
      const rolledBack = rollbackDbCmsContent();
      return NextResponse.json({
        success: true,
        cms: rolledBack,
        message: 'Reverted to previous CMS storefront version.',
      });
    }
    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
