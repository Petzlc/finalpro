import Link from 'next/link';
import { getRandomPollsInsecure } from '../database/polls';

export const metadata = {
  title: 'Home | Poll App',
  description: 'Generated by create next app',
};

export default async function Home() {
  // Generate 3 random polls on the main page
  const polls = await getRandomPollsInsecure(3);
  return (
    <div>
      <div>
        <h1>Raise your hands for destiny</h1>
      </div>
      <div>
        <Link href="/register">Sign Up</Link>
      </div>
      <div>
        <Link href="/createPolls">Take a Poll</Link>
      </div>
      <div>
        {polls.map((poll) => (
          <div key={`poll-${poll.id}`}>
            <Link href={`/poll/${poll.id}`}>
              <h3>{poll.title}</h3>
              <p>{poll.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
