import { getOptionsByPollIdInsecure } from '../../../database/options';
import { getPollByIdInsecure } from '../../../database/polls';
import PollOptions from '../../components/PollOptions';

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
  return (
    <div>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <PollOptions pollId={pollId} options={options} />
    </div>
  );
}
