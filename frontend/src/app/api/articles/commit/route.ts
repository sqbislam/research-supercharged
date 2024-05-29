import { NextRequest, NextResponse } from 'next/server';

import apiHandler from '@/lib/core/apiHandler';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const data = await apiHandler<any>({
      url: '/articles/assign',
      method: 'POST',
      data: body,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}
