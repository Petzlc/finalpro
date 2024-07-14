// import { NextApiRequest, NextApiResponse } from 'next';
// import { cookies } from 'next/headers';
// import { deleteSession } from '../../../../database/sessions';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const cookieStore = cookies();
//   const session = cookieStore.get('sessionToken');

//   if (session) {
//     await deleteSession(session.value);
//     cookieStore.delete('sessionToken');
//     res.status(200).json({ success: true });
//   } else {
//     res.status(400).json({ error: 'No session found' });
//   }
// }
