import { NextRequest, NextResponse } from 'next/server';
import {
  createResponseInsecure,
  ResponseWithId,
} from '../../../../database/responses';
import { getValidSession } from '../../../../database/sessions';
import { responseSchema } from '../../../../migrations/00004-createTableResponses'; // assume you have this schema

export type CreateResponseResponseBodyPost =
  | {
      response: ResponseWithId;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateResponseResponseBodyPost>> {
  // 1. Get the response data from the request
  const body = await request.json();

  // 2. Validate the response data with zod
  const result = responseSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Get the session token from cookies for the userId to connect to responses db
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      { errors: [{ message: 'Session token is missing' }] },
      {
        status: 401,
      },
    );
  }

  // 4. Validate the session and get the user ID
  const session = await getValidSession(sessionToken);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Session not found or has expired' }] },
      {
        status: 401,
      },
    );
  }

  const { pollId, optionId } = result.data;

  // 5. Save the response information in the database
  const newResponse = await createResponseInsecure(
    pollId,
    session.userId,
    optionId,
  );

  if (!newResponse) {
    return NextResponse.json(
      { errors: [{ message: 'Creating Response failed' }] },
      {
        status: 400,
      },
    );
  }
  return NextResponse.json({ response: newResponse });
}
