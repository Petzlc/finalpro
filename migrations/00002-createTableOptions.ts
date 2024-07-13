import { Sql } from 'postgres';
import { z } from 'zod';

export type Option = {
  id: number;
  singleOption: string;
  pollId: number;
};

export const optionSchema = z.object({
  singleOption: z.string().min(1),
  pollId: z.number(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE options (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      single_option varchar(255) NOT NULL,
      poll_id integer NOT NULL REFERENCES polls (id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE options`;
}
