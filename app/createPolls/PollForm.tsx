'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreatePollResponseBodyPost } from '../(auth)/api/createPolls/route';
import { CreateOptionsResponseBodyPost } from '../(auth)/api/options/route';
// import { getSafeReturnToPath } from '../../util/validation';
import ErrorMessage from '../ErrorMessage';
import styles from './PollForm.module.scss';

type Props = { returnTo?: string | string[] };

export default function PollForm(props: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter(
        (_, optionIndex) => optionIndex !== index,
      );
      setOptions(newOptions);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/createPolls', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: CreatePollResponseBodyPost = await response.json();
    console.log('Poll creation response data: ', data);

    if ('errors' in data) {
      return setErrors(data.errors);
    }

    const pollId = data.poll.id;
    for (const singleOption of options) {
      const optionResponse = await fetch('/api/options', {
        method: 'POST',
        body: JSON.stringify({
          singleOption,
          pollId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const optionData: CreateOptionsResponseBodyPost =
        await optionResponse.json();
      console.log('Option creation response data: ', optionData);

      if ('errors' in optionData) {
        return setErrors(optionData.errors);
      }
    }

    router.push(`/poll/${pollId}`);
  }

  return (
    <div className={styles.pollFormContainer}>
      <div className={styles.formElement}>
        <h1>Create a Poll</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.label}>
            Poll Title:
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                required
              />
            </div>
          </div>
          <div className={styles.label}>
            Poll Description:
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
                required
              />
            </div>
          </div>
          <div className={styles.label}>
            Options:
            {options.map((option, index) => (
              <div
                className={styles.inputContainer}
                key={`option-${option.index}`}
              >
                <input
                  className={styles.input}
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(index, event.currentTarget.value)
                  }
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveOption(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={handleAddOption}
            >
              +
            </button>
          </div>
          <button className={styles.createPollButton}>Create Poll</button>
          {errors.map((error) => (
            <div className={styles.error} key={`error-${error.message}`}>
              <ErrorMessage>{error.message}</ErrorMessage>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
