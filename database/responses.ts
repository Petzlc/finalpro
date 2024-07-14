import { cache } from 'react';
import { sql } from './connect';

export type Response = {
  id: number;
  pollId: number;
  userId: number;
  optionId: number;
};

export type ResponseWithId = Response & { id: number };

export const createResponseInsecure = cache(
  async (pollId: number, userId: number, optionId: number) => {
    const [response] = await sql<Response[]>`
      INSERT INTO
        responses (poll_id, user_id, option_id)
      VALUES
        (
          ${pollId},
          ${userId},
          ${optionId}
        )
      RETURNING
        id,
        poll_id,
        user_id,
        option_id
    `;
    return response;
  },
);

// export const getResponseWithId = cache(async (id: number) => {
//   const [response] = await sql<ResponseWithId[]>`
//     SELECT
//       *
//     FROM
//       responses
//     WHERE
//       id = ${id}
//   `;
//   return response;
// });
