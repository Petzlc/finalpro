import { cache } from 'react';
// import { Poll } from '../migrations/00001-createTablePolls';
import { sql } from './connect';

export type Poll = {
  id: number;
  title: string;
  description: string;
  // isPrivate: boolean;
  userId: number;
};

export type PollWithId = Poll & { id: number };

export const createPollInsecure = cache(
  async (title: string, description: string, userId: number) => {
    const [poll] = await sql<Poll[]>`
      -- was PollWithId before
      INSERT INTO
        polls (title, description, user_id)
      VALUES
        (
          ${title},
          ${description},
          ${userId}
        )
      RETURNING
        id,
        title,
        description,
        user_id
    `;
    return poll;
  },
);

export const getPollByIdInsecure = cache(async (id: number) => {
  const [poll] = await sql<PollWithId[]>`
    SELECT
      *
    FROM
      polls
    WHERE
      id = ${id}
  `;
  return poll;
});

export const getAllPollsInsecure = cache(async () => {
  const polls = await sql<PollWithId[]>`
    SELECT
      id,
      title,
      description
    FROM
      polls
  `;
  return polls;
});

export const getRandomPollsInsecure = cache(async (limit: number) => {
  const polls = await sql<Poll[]>`
    SELECT
      id,
      title,
      description
    FROM
      polls
    ORDER BY
      random()
    LIMIT
      ${limit}
  `;
  return polls;
});

// export const getPollByTitleInsecure = cache(async (title: string) => {
//   const [poll] = await sql<Poll[]>`
//     SELECT
//       title,
//     FROM
//       polls
//   `;
//   return poll;
// });
// export const getAllPollsInsecure = cache(async () => {
//   const polls = await sql<PollWithId[]>`
//     SELECT
//       *
//     FROM
//       polls
//   `;
//   return polls;
// });
