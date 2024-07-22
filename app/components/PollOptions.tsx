'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../poll/[id]/poll.module.scss';

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
    <form onSubmit={handleSubmit} className={styles.pollOptionsContainer}>
      <div className={styles.radioContainer}>
        {options.map((option) => (
          <div key={`option-${option.id}`} className={styles.optionItem}>
            <input
              type="radio"
              name="pollOption"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleVote(option.id)}
              className={styles.radioInput}
            />
            <span className={styles.optionText}>{option.singleOption}</span>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton}>Submit</button>
      </div>
    </form>
  );
}
