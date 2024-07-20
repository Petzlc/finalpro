// 'use client';

// import { useSearchParams } from 'next/navigation';
// import PollResultsClient from './PollResultsClient';

// export default function ThankYouContent() {
//   const searchParams = useSearchParams();
//   const pollId = Number(searchParams.get('pollId'));

//   if (!pollId) {
//     return <div>Invalid Poll ID</div>;
//   }

//   return (
//     <div>
//       <h1>Thank You for Voting!</h1>
//       <PollResultsClient pollId={pollId} />
//     </div>
//   );
// }
