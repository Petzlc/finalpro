// import { NextRequest, NextResponse } from 'next/server';
// import { getOptionsByPollIdInsecure } from '../../../../database/options';
// import { getResponsesByPollIdInsecure } from '../../../../database/responses';

// export type PollResult = {
//   optionId: number;
//   count: number;
//   optionText: string;
// };

// export type PollResultResponseBodyGet =
//   | PollResult[]
//   | { error: string }
//   | { message: string };

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<PollResultResponseBodyGet>> {
//   const { searchParams } = new URL(request.url);
//   const pollId = Number(searchParams.get('pollId'));

//   if (!pollId) {
//     return NextResponse.json({ error: 'Invalid poll ID' }, { status: 400 });
//   }

//   const responses = await getResponsesByPollIdInsecure(pollId);
//   const options = await getOptionsByPollIdInsecure(pollId);

//   if (responses.length === 0) {
//     return NextResponse.json({ message: 'No responses yet' }, { status: 200 });
//   }

//   const results = responses.map((response) => {
//     const option = options.find((option) => option.id === response.optionId);
//     return {
//       optionId: response.optionId,
//       count: response.count,
//       optionText: option ? option.singleOption : 'Unknown Option',
//     };
//   });

//   return NextResponse.json(results, { status: 200 });
// }
