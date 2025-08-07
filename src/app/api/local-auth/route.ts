import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const apiRes = await fetch(
      'https://api-fms.data.ventitechnologies.net/core/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'venti',
          password: 'venti',
        }),
      },
    );

    const response = NextResponse.json(await apiRes.json());

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Explicitly declare non-existing methods as undefined
export const GET = undefined;
export const PUT = undefined;
export const DELETE = undefined;
