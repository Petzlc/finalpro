// This page is for creating polls I guess so you might then want to put this into a polls folder that doesn't exist yet with the following path: app/polls/dashboard

// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getValidSession } from '../../database/sessions';

// export const metadata = {
//   title: 'Poll Admin page',
//   description: 'Generated by create next app',
// };

// export default async function PollsPage() {
//   // Task: Protect the dashboard page and redirect to login if the user is not logged in
//   // 1. Checking if the sessionToken cookie exists
//   const sessionCookie = cookies().get('sessionToken');

//   // 2. Check if the sessionToken cookie is still valid
//   const session = sessionCookie && (await getValidSession(sessionCookie.value));

//   // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
//   if (session) {
//     redirect(`/login?returnTo=/dashboard`); // once you set up the polls folder this must look like that: redirect(`/login?returnTo=/polls/dashboard`)
//   }

//   // 4. If the sessionToken cookie is valid, allow access to dashboard page
// }
