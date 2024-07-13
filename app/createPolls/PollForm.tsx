'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreatePollResponseBodyPost } from '../(auth)/api/createPolls/route';
import { getSafeReturnToPath } from '../../util/validation';
import ErrorMessage from '../ErrorMessage';

type Props = { returnTo?: string | string[] };

export default function PollForm(props: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [options, setOptions] = useState(['', '']);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  // const handleAddOption = () => {
  //   setOptions([...options, '']);
  // };

  // const handleOptionChange = (index: number, value: string) => {
  //   const newOptions = [...options];
  //   newOptions[index] = value;
  //   setOptions(newOptions);
  // };

  // const handleRemoveOption = (index: number) => {
  //   if (options.length > 2) {
  //     const newOptions = options.filter(
  //       (_, optionIndex) => optionIndex !== index,
  //     );
  //     setOptions(newOptions);
  //   }
  // };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/createPolls', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        // options,
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

    // Redirect after successful poll creation
    router.push(getSafeReturnToPath(props.returnTo) || '/');
    router.refresh();
  }

  return (
    <div>
      <h1>Create a new Poll</h1>
      <form onSubmit={async (event) => await handleSubmit(event)}>
        <div>
          <label>
            Poll Title:
            <input
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        {/* <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(event) =>
                  handleOptionChange(index, event.currentTarget.value)
                }
                required
              />
              {options.length > 2 && (
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  Delete
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div> */}
        <button>Create Poll</button>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
