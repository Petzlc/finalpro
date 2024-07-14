// import { NextRequest, NextResponse } from 'next/server';
// import { getValidSession } from '../../../../database/sessions';
// import { getUserByIdInsecure } from '../../../../database/users';

// export async function GET(request: NextRequest): Promise<NextResponse> {
//   const sessionToken = request.cookies.get('sessionToken')?.value;

//   if (!sessionToken) {
//     return NextResponse.json({ user: null }, { status: 401 });
//   }

//   const session = await getValidSession(sessionToken);

//   if (!session) {
//     return NextResponse.json({ user: null }, { status: 401 });
//   }

//   const user = await getUserByIdInsecure(session.userId);

//   if (!user) {
//     return NextResponse.json({ user: null }, { status: 404 });
//   }

//   return NextResponse.json({ user });
// }
