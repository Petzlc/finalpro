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
            {response.optionText}: {response.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default async function PollResults({ pollId }: PollResultsProps) {
//   const poll = await getPollByIdInsecure(pollId);
//   const responses = await getResponsesByPollIdInsecure(pollId);

//   if (!poll) {
//     return <div>Poll not found</div>;
//   }

//   if (responses.length === 0) {
//     return <div>No responses yet.</div>;
//   }

//   return (
//     <div>
//       <h2>{poll.title}</h2>
//       <ul>
//         {responses.map((response) => (
//           <li key={`response-${response.optionId}`}>
//             {response.optionText}: {response.count} votes
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
