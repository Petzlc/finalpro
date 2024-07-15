'use client';

import { useState } from 'react';

type PollOptionsProps = {
  pollId: number;
  options: { id: number; singleOption: string }[];
};

export default function PollOptions({ pollId, options }: PollOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const handleVote = async (optionId: number) => {
    setSelectedOption(optionId);
    console.log(options);

    const response = await fetch('/api/response', {
      method: 'POST',
      body: JSON.stringify({ pollId, optionId }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to submit vote');
    } else {
      console.log('Vote submitted successfully');
    }
  };

  return (
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
    </div>
  );
}
