import { cache } from 'react';
import { sql } from './connect';

export type Response = {
  id: number;
  pollId: number;
  userId: number;
  optionId: number;
};

export type ResponseWithId = Response & { id: number };

export type ResponseWithCountAndText = {
  optionId: number;
  count: number;
  optionText: string;
};

// export type PollDetails = {
//   id: number;
//   title: string;
//   description: string;
// };

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

// So wars vorher
// export const getResponsesByPollIdInsecure = cache(async (pollId: number) => {
//   const responses = await sql<
//     {
//       optionId: number;
//       count: number;
//     }[]
//   >`
//     SELECT
//       option_id AS "optionId",
//       count(*)::integer AS COUNT
//     FROM
//       responses
//     WHERE
//       poll_id = ${pollId}
//     GROUP BY
//       option_id
//   `;
//   return responses;
// });

// To show real names and options on the results page
export const getResponsesByPollIdInsecure = cache(async (pollId: number) => {
  const responses = await sql<ResponseWithCountAndText[]>`
    SELECT
      r.option_id AS "optionId",
      count(r.id) AS "count",
      o.single_option AS "optionText"
    FROM
      responses r
      INNER JOIN options o ON r.option_id = o.id
    WHERE
      r.poll_id = ${pollId}
    GROUP BY
      r.option_id,
      o.single_option
  `;
  return responses;
});

// make sure every user can only take poll once
export const getResponseByPollIdAndUserIdInsecure = cache(
  async (pollId: number, userId: number) => {
    const [response] = await sql<Response[]>`
      SELECT
        id,
        poll_id,
        user_id,
        option_id
      FROM
        responses
      WHERE
        poll_id = ${pollId}
        AND user_id = ${userId}
    `;
    return response;
  },
);
