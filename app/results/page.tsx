import Link from 'next/link';
import { getOptionsByPollIdInsecure } from '../../database/options';
import { getPollByIdInsecure } from '../../database/polls';
import { getResponsesByPollIdInsecure } from '../../database/responses';
import PollResultsChart from '../components/PollResultsChart';

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

  return (
    <div>
      <h1>{poll.title}</h1>
      <PollResultsChart labels={labels} data={data} />
      <Link href="/dashboard">Return to dashboard</Link>
      <Link href="/createPolls">Create another poll</Link>
    </div>
  );
}
