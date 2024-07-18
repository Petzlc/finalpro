import { getResponsesByPollIdInsecure } from '../../database/responses';

type PollResultsProps = {
  pollId: number;
};

export default async function PollResults({ pollId }: PollResultsProps) {
  const responses = await getResponsesByPollIdInsecure(pollId);

  if (responses.length === 0) {
    return <div>No responses yet.</div>;
  }

  return (
    <div>
      <h2>Poll Results</h2>
      <ul>
        {responses.map((response) => (
          <li key={`response-${response.optionId}`}>
            Option {response.optionId}: {response.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
}
