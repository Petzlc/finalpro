'use client';

type PollResultsClientProps = {
  responses: { optionId: number; count: number }[];
};

export default function PollResultsClient({
  responses,
}: PollResultsClientProps) {
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
