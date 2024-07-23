import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { getValidSessionById } from '../../../database/sessions';
import { getUserByIdInsecure } from '../../../database/users';
import styles from './Profile.module.scss';

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
  // const user = sessionCookie && getUser(sessionCookie.value);
  const token =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  const userId = token?.userId;
  let user = null;

  if (userId !== undefined) {
    user = await getUserByIdInsecure(userId);
  } else {
    console.error('userId is undefined');
  }

  // in lecture video code line is (await getUser(sessionCookie.value)); But when i type it like this i get an error Unhandled runtime postgres syntax blabla. Also i don't move from the profile page when i hit logout button. only doing this because of redirect(`/`); in logout/action.ts

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    return redirect('/login');
  }

  return (
    <div className={styles.profileContainer}>
      <h1>{props.params.username}'s Profile</h1>
      <LogoutButton />
    </div>
  );
}
