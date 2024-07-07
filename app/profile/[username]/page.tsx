import LogoutButton from '../../(auth)/logout/LogoutButton';

type Props = {
  params: {
    username: String;
  };
};

export default function UserProfile(props: Props) {
  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  // 2. Query the current user with the sessionToken
  // 3. If user doesn't exist, redirect to login page
  // 4. If user exists, render the page

  return (
    <div>
      <h1>{props.params.username}' Profile</h1>
      <LogoutButton />
    </div>
  );
}
