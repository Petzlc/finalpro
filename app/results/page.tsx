import { getResponsesByPollIdInsecure } from '../../database/responses';
import PollResultsClient from '../components/PollResultsClient';

type Props = {
  searchParams: { pollId: string };
};

export default async function ResultsPage({ searchParams }: Props) {
  const pollId = parseInt(searchParams.pollId, 10);

  if (!pollId) {
    return <div>No poll ID provided.</div>;
  }

  const responses = await getResponsesByPollIdInsecure(pollId);

  return (
    <div>
      <h1>Poll Results</h1>
      <PollResultsClient responses={responses} />
    </div>
  );
}
