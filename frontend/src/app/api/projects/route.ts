import { NextResponse } from 'next/server';

import apiHandler from '@/lib/core/apiHandler';
import { ProjectCreate } from '@/lib/types';

// Get all Projects
export async function GET() {
  try {
    const data = await apiHandler<any>({
      url: '/projects',
      method: 'GET',
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}

// Create a new Project
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const data = await apiHandler<ProjectCreate>({
      url: '/projects/create',
      method: 'POST',
      data: body,
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}
