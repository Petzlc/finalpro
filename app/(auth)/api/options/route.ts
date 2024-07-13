import { NextRequest, NextResponse } from 'next/server';
import {
  createOptionInsecure,
  OptionWithId,
} from '../../../../database/options';
import { getValidSession } from '../../../../database/sessions';
import { optionSchema } from '../../../../migrations/00002-createTableOptions';

export type CreateOptionsResponseBodyPost =
  | {
      option: OptionWithId;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateOptionsResponseBodyPost>> {
  // 1. Get the options data from the request
  const body = await request.json();

  // 2. Validate the options data with zod
  const result = optionSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Get the session token from cookies for the userId to connect to options db
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      { errors: [{ message: 'session token is missing' }] },
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

  const { singleOption, pollId } = result.data;

  //

  // 5. Save the options information in the database
  const newOption = await createOptionInsecure(singleOption, pollId);

  if (!newOption) {
    return NextResponse.json(
      { errors: [{ message: 'Creating Option failed' }] },
      {
        status: 400,
      },
    );
  }
  return NextResponse.json({ option: newOption });
}
