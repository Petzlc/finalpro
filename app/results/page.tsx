import Link from 'next/link';
import { getOptionsByPollIdInsecure } from '../../database/options';
import { getPollByIdInsecure } from '../../database/polls';
import { getResponsesByPollIdInsecure } from '../../database/responses';
import PollResultsChart from '../components/PollResultsChart';
import styles from './ResultsPage.module.scss';

type Props = {
  searchParams: { pollId: string };
};

export default async function ResultsPage({ searchParams }: Props) {
  const pollId = parseInt(searchParams.pollId, 10);
  const poll = await getPollByIdInsecure(pollId);

  if (!poll) {
    return <div>Poll not found</div>;
  }

  const responses = await getResponsesByPollIdInsecure(pollId);
  const options = await getOptionsByPollIdInsecure(pollId);

  const labels = options.map((option) => option.singleOption);
  const data = responses.map((response) => response.count);

  console.log('Responses:', responses);
  console.log('Data:', data);

  return (
    <div className={styles.resultsContainer}>
      <h1>{poll.title}</h1>
      <div className={styles.chartContainer}>
        <PollResultsChart labels={labels} data={data} />
      </div>
      <hr className={styles.divider} />
      <div className={styles.resultsLinks}>
        <Link href="/dashboard" className={styles.resultsLink}>
          Return to dashboard
        </Link>
        <Link href="/createPolls" className={styles.resultsLink}>
          Create another poll
        </Link>
      </div>
    </div>
  );
}
