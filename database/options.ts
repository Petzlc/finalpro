import { cache } from 'react';
import { Option } from '../migrations/00002-createTableOptions';
import { sql } from './connect';

// export type Option = {
//   id: number;
//   singleOption: string;
//   pollId: number;
// };

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
