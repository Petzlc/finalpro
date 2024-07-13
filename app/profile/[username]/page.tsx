import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { getUser } from '../../../database/users';

type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfile(props: Props) {
  // Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionCookie && getUser(sessionCookie.value);
  // in lecture video code linie is (await getUser(sessionCookie.value)); But when i type it like this i get an error Unhandled runtime postgres syntax blabla. Also i don't move from the profile page when i hit logout button. only doing this because of redirect(`/`); in logout/action.ts

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>{props.params.username}'s Profile</h1>
      <LogoutButton />
    </div>
  );
}
