import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUserInsecure,
  getUserInsecure,
  User,
} from '../../../../database/users';

type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  email: z.string().min(3),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Implement the user registration workflow

  // console.log(await request.json());

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data with zod
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Check if user already exist in the database

  const user = await getUserInsecure(result.data.username, result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'Username already taken' }] },
      {
        status: 400,
      },
    );
  }

  // 4. Hash the plain password from the user

  const passwordHash = await bcrypt.hash(result.data.password, 12);

  if (!passwordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Login failed' }] },
      {
        status: 400,
      },
    );
  }

  console.log('Information: ', result.data.password, passwordHash);

  // 5. Save the user information with the hashed password in the database

  const newUser = await createUserInsecure(
    result.data.username,
    passwordHash,
    result.data.email,
  );

  console.log('User: ', newUser);

  return NextResponse.json({ user: 'user' });
}

// maybe error comes from not providing email and isOnline