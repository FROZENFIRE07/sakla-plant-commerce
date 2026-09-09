import { NextResponse } from 'next/server';
import { getPlant, updatePlant, deletePlant } from '../../../../lib/db';
import { getAdminFromRequest } from '../../../../lib/auth';

export async function GET(request, { params }) {
  const { id } = await params;
  const plant = getPlant(id);
  if (!plant) {
    return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
  }
  return NextResponse.json({ plant });
}

export async function PUT(request, { params }) {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const data = await request.json();
    const plant = updatePlant(id, data);
    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }
    return NextResponse.json({ plant });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const success = deletePlant(id);
  if (!success) {
    return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
