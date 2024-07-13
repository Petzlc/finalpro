import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getUserBySessionToken } from '../../../../database/users';

export type User = {
  id: number;
  userName: string;
  email: string;
};

export async function GET(): Promise<NextResponse<{ user: User | null }>> {
  const sessionToken = cookies().get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json({ user: null });
  }

  const user = await getUserBySessionToken(sessionToken);

  return NextResponse.json({ user: user ?? null });
}
