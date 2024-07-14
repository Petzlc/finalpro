import { Sql } from 'postgres';

export type Response = {
  id: number;
  pollId: number;
  userId: number;
  optionId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE responses (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      poll_id integer NOT NULL REFERENCES polls (id) ON DELETE cascade,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      option_id integer NOT NULL REFERENCES options (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE responses`;
}
