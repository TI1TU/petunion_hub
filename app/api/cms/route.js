import { NextResponse } from 'next/server';
import { getDbCmsContent } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const cms = getDbCmsContent();
  return NextResponse.json({ cms });
}
