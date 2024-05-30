import { NextResponse } from 'next/server';

import apiHandler from '@/lib/core/apiHandler';

// Get Project Status
export async function GET(
  request: Request,
  { params }: { params: { project_id: string } }
) {
  try {
    const data = await apiHandler<any>({
      url: `/projects/status/${params.project_id}`,
      method: 'GET',
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}
