import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../database/sessions';
import { getSafeReturnToPath } from '../../util/validation';
import PollForm from './PollForm';

// The createPolls page should only be accessible once the user is logged in
type Props = {
  searchParams: {
    returnTo?: string | string[];
  };
};
export default async function createPolls(props: Props) {
  // Task: Protect the Polls page and redirect to login if the user is not logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie.value));
  // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) {
    redirect(getSafeReturnToPath(props.searchParams.returnTo) || `/login`);
  }

  // 4. If the sessionToken cookie is valid, allow access to dashboard page
  return <PollForm returnTo={props.searchParams.returnTo} />;
}
