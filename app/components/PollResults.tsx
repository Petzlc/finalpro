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

// 'use client';

// import Chart from 'chart.js/auto';
// import { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';

// type PollResult = {
//   optionId: number;
//   count: number;
//   optionText: string;
// };

// type PollResultsProps = {
//   pollId: number;
// };

// export default function PollResults({ pollId }: PollResultsProps) {
//   const [results, setResults] = useState<PollResult[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await fetch(`/api/poll-results?pollId=${pollId}`);
//         const data = await response.json();
//         setResults(data);
//       } catch (error) {
//         console.error('Error fetching poll results:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults().catch(console.error);
//   }, [pollId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (results.length === 0) {
//     return <div>No responses yet</div>;
//   }

//   const data = {
//     labels: results.map((result) => result.optionText),
//     datasets: [
//       {
//         label: 'Votes',
//         data: results.map((result) => result.count),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Poll Results</h2>
//       <Bar data={data} />
//     </div>
//   );
// }
