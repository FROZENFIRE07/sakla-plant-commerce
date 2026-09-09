import { NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '../../../lib/db';
import { getAdminFromRequest } from '../../../lib/auth';

// GET /api/inquiries — Admin only
export async function GET() {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const inquiries = getInquiries();
  return NextResponse.json({ inquiries });
}

// POST /api/inquiries — Public (customers submit inquiry)
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const inquiry = createInquiry(body);
    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received. Our nursery specialist will contact you soon.',
        inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process inquiry: ' + error.message },
      { status: 500 }
    );
  }
}
