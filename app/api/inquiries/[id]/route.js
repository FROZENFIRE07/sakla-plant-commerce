import { NextResponse } from 'next/server';
import { getInquiry, updateInquiry, deleteInquiry } from '../../../../lib/db';
import { getAdminFromRequest } from '../../../../lib/auth';

export async function PATCH(request, { params }) {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateInquiry(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteInquiry(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
