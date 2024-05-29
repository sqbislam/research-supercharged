import { NextRequest, NextResponse } from 'next/server';

import apiHandler from '@/lib/core/apiHandler';

type ArticleParams = {
  search_query: string;
  start?: number;
  maxResult?: number;
};
// Get all Projects
export async function GET(request: NextRequest) {
  const search_query = request.nextUrl.searchParams.get('search_query');
  const start = request.nextUrl.searchParams.get('start');
  const maxResult = request.nextUrl.searchParams.get('maxResult');
  if (!search_query)
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  try {
    const params: ArticleParams = {
      search_query,
      start: start ? parseInt(start) : 0,
      maxResult: maxResult ? parseInt(maxResult) : 10,
    };
    const data = await apiHandler<any>({
      url: '/articles/fetch',
      method: 'GET',
      params,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const data = await apiHandler<any>({
      url: '/articles/extract',
      method: 'POST',
      data: body,
      
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}
