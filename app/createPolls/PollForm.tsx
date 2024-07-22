'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreatePollResponseBodyPost } from '../(auth)/api/createPolls/route';
import { CreateOptionsResponseBodyPost } from '../(auth)/api/options/route';
// import { getSafeReturnToPath } from '../../util/validation';
import ErrorMessage from '../ErrorMessage';

// I might want to use this returnTo for a safe return to a page, just like in the LoginForm. Looks like this:
// router.push(
//   getSafeReturnToPath(props.returnTo) || `/profile/${data.user.userName}`,
// );
// router.refresh();
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

    // Create the Poll
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

    // Create options after poll creation
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

    // Redirect after successful poll creation
    // router.push(getSafeReturnToPath(props.returnTo) || `/poll/${pollId}`);
    // router.refresh();

    // Redirect to created poll page after successful poll creation
    router.push(`/poll/${pollId}`);
  }

  return (
    <div>
      <h1>Create a new Poll</h1>
      <form onSubmit={handleSubmit}>
        {/* <form onSubmit={async (event) => await handleSubmit(event)}> */}
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
        <div>
          <label>
            Options:
            {options.map((option, index) => (
              <div key={`option-${option.index}`}>
                <input
                  value={option}
                  onChange={(event) =>
                    handleOptionChange(index, event.currentTarget.value)
                  }
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </label>
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
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

// ('use client');

// // I might want to use this returnTo for a safe return to a page, just like in the LoginForm. Looks like this:
// // router.push(
// //   getSafeReturnToPath(props.returnTo) || `/profile/${data.user.userName}`,
// // );
// // router.refresh();
// type Props = { returnTo?: string | string[] };

// export default function PollForm(props: Props) {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [options, setOptions] = useState([
//     {
//       singleOption: '',
//     },
//   ]);
//   const [errors, setErrors] = useState<{ message: string }[]>([]);

//   const router = useRouter();

//   const handleAddOption = () => {
//     setOptions([
//       ...options,
//       {
//         singleOption: '',
//       },
//     ]);
//   };

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleRemoveOption = (index: number) => {
//     if (options.length > 2) {
//       const newOptions = options.filter(
//         (_, optionIndex) => optionIndex !== index,
//       );
//       setOptions(newOptions);
//     }
//   };

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     // Create the Poll
//     const response = await fetch('/api/createPolls', {
//       method: 'POST',
//       body: JSON.stringify({
//         title,
//         description,
//       }),

//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data: CreatePollResponseBodyPost = await response.json();
//     console.log('Poll creation response data: ', data);

//     if ('errors' in data) {
//       return setErrors(data.errors);
//     }

//     // Create options after poll creation
//     const pollId = data.poll.id;
//     for (const singleOption of options) {
//       const optionResponse = await fetch('/api/options', {
//         method: 'POST',
//         body: JSON.stringify({
//           singleOption,
//           pollId,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const optionData: CreateOptionsResponseBodyPost =
//         await optionResponse.json();
//       console.log('Option creation response data: ', optionData);

//       if ('errors' in optionData) {
//         return setErrors(optionData.errors);
//       }
//     }

//     // Redirect after successful poll creation
//     // router.push(getSafeReturnToPath(props.returnTo) || '/');
//     // router.refresh();

//     // Redirect to created poll page after successful poll creation
//     router.push(`/poll/${pollId}`);
//   }

//   return (
//     <div>
//       <h1>Create a new Poll</h1>
//       <form onSubmit={handleSubmit}>
//         {/* <form onSubmit={async (event) => await handleSubmit(event)}> */}
//         <div>
//           <label>
//             Poll Title:
//             <input
//               value={title}
//               onChange={(event) => setTitle(event.currentTarget.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Description:
//             <input
//               value={description}
//               onChange={(event) => setDescription(event.currentTarget.value)}
//               required
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Options:
//             {options.map((option) => (
//               <div key={`option-${option.id}`}>
//                 <input
//                   value={option}
//                   onChange={(event) =>
//                     handleOptionChange(index, event.currentTarget.value)
//                   }
//                   required
//                 />
//                 {options.length > 2 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveOption(index)}
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             ))}
//           </label>
//           <button type="button" onClick={handleAddOption}>
//             Add Option
//           </button>
//         </div>
//         <button>Create Poll</button>

//         {errors.map((error) => (
//           <div className="error" key={`error-${error.message}`}>
//             <ErrorMessage>{error.message}</ErrorMessage>
//           </div>
//         ))}
//       </form>
//     </div>
//   );
// }
