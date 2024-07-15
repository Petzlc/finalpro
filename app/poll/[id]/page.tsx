import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getOptionsByPollId } from '../../../database/options';
import { getPollByIdInsecure } from '../../../database/polls';

type Props = {
  params: { id: string };
};

export default async function PollPage({ params }: Props) {
  const poll = await getPollByIdInsecure(Number(params.id));
  const options = await getOptionsByPollId(Number(params.id));

  if (!poll || !options) {
    notFound();
  }

  const sessionCookie = cookies().get('sessionToken');

  async function handleVote(optionId: number) {
    if (sessionCookie) {
      // Hier die Logik für das Abstimmen implementieren
      await voteOption(sessionCookie.value, optionId);
    } else {
      // Logik, wenn der Benutzer nicht eingeloggt ist (zb Weiterleitungg zum login)
    }
  }

  return (
    <div>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <form>
        {options.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="radio"
                name="pollOption"
                value={option.id}
                onClick={() => handleVote(option.id)}
              />
              {option.singleOption}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}
