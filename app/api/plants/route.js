import { NextResponse } from 'next/server';
import { getPlants, createPlant } from '../../../lib/db';
import { getAdminFromRequest } from '../../../lib/auth';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filters = {
    category: searchParams.get('category') || undefined,
    sort: searchParams.get('sort') || undefined,
    size: searchParams.get('size') || undefined,
    search: searchParams.get('search') || undefined,
  };

  const plants = getPlants(filters);
  return NextResponse.json({ plants, total: plants.length });
}

export async function POST(request) {
  const admin = await getAdminFromRequest();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.name || !data.price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }
    const plant = createPlant(data);
    return NextResponse.json({ plant }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
