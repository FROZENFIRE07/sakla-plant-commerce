import { NextResponse } from 'next/server';
import { getDashboardStats } from '../../../../lib/db';
import { getAdminFromRequest } from '../../../../lib/auth';

export async function GET() {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = getDashboardStats();
  return NextResponse.json({ stats });
}
