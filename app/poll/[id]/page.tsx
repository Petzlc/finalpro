import { cookies } from 'next/headers';
import Link from 'next/link';
import { getOptionsByPollIdInsecure } from '../../../database/options';
import { getPollByIdInsecure } from '../../../database/polls';
import { getResponseByPollIdAndUserIdInsecure } from '../../../database/responses';
import { getValidSession } from '../../../database/sessions';
import PollOptions from '../../components/PollOptions';
import styles from './poll.module.scss';

// import PollResults from '../../components/PollResults';

type Props = {
  params: { id: string };
};

export default async function PollPage({ params }: Props) {
  const pollId = parseInt(params.id, 10);
  const poll = await getPollByIdInsecure(pollId);
  const options = await getOptionsByPollIdInsecure(pollId);
  console.log(options);

  if (!poll) {
    return <div>Poll not found</div>;
  }

  // make sure every User only takes poll once
  // 1. Get the session token from cookies
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  let userHasResponded = false;

  if (sessionToken) {
    // 2. Validate the session and get the user ID
    const session = await getValidSession(sessionToken);

    if (session && session.userId) {
      // 3. Check if the user has already responded to this poll
      const existingResponse = await getResponseByPollIdAndUserIdInsecure(
        pollId,
        session.userId,
      );
      userHasResponded = !!existingResponse;
    }
  }

  return (
    <div className={styles.pollContainer}>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      {userHasResponded ? (
        <div>You have already responded to this poll</div>
      ) : (
        <PollOptions pollId={pollId} options={options} />
      )}
      {/* <PollResults pollId={pollId} /> */}
      <Link href={`/results?pollId=${pollId}`}>View Results</Link>
    </div>
  );
}
