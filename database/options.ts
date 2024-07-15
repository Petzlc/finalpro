import { cache } from 'react';
// import { Option } from '../migrations/00002-createTableOptions';
import { sql } from './connect';

export type Option = {
  id: number;
  singleOption: string;
  pollId: number;
};

export type OptionWithId = Option & { id: number };

export const createOptionInsecure = cache(
  async (singleOption: string, pollId: number) => {
    const [option] = await sql<Option[]>`
      INSERT INTO
        options (single_option, poll_id)
      VALUES
        (
          ${singleOption},
          ${pollId}
        )
      RETURNING
        id,
        single_option,
        poll_id
    `;
    return option;
  },
);

// export async function getOptionsByPollId = cache(async (pollId: number) => {
//   const options = await sql<Option[]>`
//     SELECT
//       id,
//       single_option,
//       poll_id
//     FROM
//       options
//     WHERE
//       poll_id = ${pollId}
//   `;
//   return options;
// })

export const getOptionsByPollIdInsecure = cache(async (pollId: number) => {
  const options = await sql<Option[]>`
    SELECT
      id,
      single_option,
      poll_id
    FROM
      options
    WHERE
      poll_id = ${pollId}
  `;
  return options;
});
