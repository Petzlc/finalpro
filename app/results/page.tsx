import { getPollByIdInsecure } from '../../database/polls';
// import { getResponsesByPollIdInsecure } from '../../database/responses';
// import PollResultsClient from '../components/PollResultsClient';
import PollResults from '../components/PollResults';

type Props = {
  searchParams: { pollId: string };
};

export default async function ResultsPage({ searchParams }: Props) {
  const pollId = parseInt(searchParams.pollId, 10);
  const poll = await getPollByIdInsecure(pollId);

  if (!poll) {
    return <div>Poll not found</div>;
  }

  // const responses = await getResponsesByPollIdInsecure(pollId);

  return (
    <div>
      <h1>{poll.title}</h1>
      <PollResults pollId={pollId} />
    </div>
  );
}
