const [isLoggedIn, setIsLoggedIn] = useState(false);
const [username, setUsername] = useState('');

useEffect(() => {
  async function fetchUser() {
    try {
      const response = await fetch('/api/getUser');
      const data = await response.json();
      if (data.user) {
        setIsLoggedIn(true);
        setUsername(data.user.username);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setIsLoggedIn(false);
    }
  }

  fetchUser();
}, []);

{
  isLoggedIn ? (
    <Link href={`/profile/${username}`}>Profile</Link>
  ) : (
    <Link href="/login">Profile</Link>
  );
}
