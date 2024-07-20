'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type PollOptionsProps = {
  pollId: number;
  options: { id: number; singleOption: string }[];
};

export default function PollOptions({ pollId, options }: PollOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const router = useRouter();
  // const handleVote = async (optionId: number) => {
  //   setSelectedOption(optionId);
  //   console.log(options);

  //   const response = await fetch('/api/response', {
  //     method: 'POST',
  //     body: JSON.stringify({ pollId, optionId }),
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });

  const handleVote = (optionId: number) => {
    setSelectedOption(optionId);
    console.log(`Selected option: ${optionId}`);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedOption === null) {
      console.error('No option selected');
      return;
    }

    const response = await fetch('/api/response', {
      method: 'POST',
      body: JSON.stringify({ pollId, optionId: selectedOption }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to submit vote');
    } else {
      console.log('Vote submitted successfully');
      router.push(`/results?pollId=${pollId}`);
      // router.push('/thankyou');
      // router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {options.map((option) => (
          <div key={`option-${option.id}`}>
            <input
              type="radio"
              name="pollOption"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleVote(option.id)}
            />
            {option.singleOption}
          </div>
        ))}
        <button>Submit</button>
      </div>
    </form>
  );
}
