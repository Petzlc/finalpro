import Link from 'next/link';
import { getRandomPollsInsecure } from '../database/polls';
import styles from './page.module.scss';

export const metadata = {
  title: 'Home | Poll App',
  description: 'Generated by create next app',
};

export default async function Home() {
  // Generate 3 random polls on the main page
  const polls = await getRandomPollsInsecure(3);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroText}>
        <h1>Raise your hands for destiny</h1>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/register" className={styles.styledLink}>
          Sign Up
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/createPolls" className={styles.styledLink}>
          Create a Poll
        </Link>
      </div>
      <div className={styles.pollCardsContainer}>
        {polls.map((poll) => (
          <div key={`poll-${poll.id}`} className={styles.pollCard}>
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
