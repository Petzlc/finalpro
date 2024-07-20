import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getOptionsByPollIdInsecure } from '../../database/options';
import { getResponsesByPollIdInsecure } from '../../database/responses';

ChartJS.register(ArcElement, Tooltip, Legend);

type PollResultsProps = {
  pollId: number;
};

export default async function PollResults({ pollId }: PollResultsProps) {
  const responses = await getResponsesByPollIdInsecure(pollId);
  const options = await getOptionsByPollIdInsecure(pollId);

  if (responses.length === 0) {
    return <div>No responses yet.</div>;
  }

  const results = responses.map((response) => {
    const option = options.find((option) => option.id === response.optionId);
    return {
      ...response,
      optionText: option ? option.singleOption : 'Unknown Option',
    };
  });

  const data = {
    labels: results.map((result) => result.optionText),
    datasets: [
      {
        data: results.map((result) => result.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div>
      <h2>Poll Results</h2>
      <Pie data={data} />
    </div>
  );
}
