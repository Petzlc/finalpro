import Link from 'next/link';

export default function ThankYou() {
  return (
    <div>
      <h1>Thank you for participating in this poll!</h1>
      <p>Your response has been recorded.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

// 'use client';

// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import PollResults from '../components/PollResults';

// export default function ThankYouPage() {
//   const searchParams = useSearchParams();
//   const pollId = parseInt(searchParams.get('pollId') || '0', 10);

//   if (isNaN(pollId)) {
//     return <div>Invalid poll ID</div>;
//   }

//   return (
//     <div>
//       <h1>Thank you for participating in this poll!</h1>
//       <p>Your response has been recorded.</p>
//       <PollResults pollId={pollId} />
//       <Link href="/">Return Home</Link>
//     </div>
//   );
// }

// import Link from 'next/link';
// import PollResults from '../components/PollResults';

// type Props = {
//   searchParams: {pollId: string};
// };

// export default function ThankYouPage({ searchParams }: Props) {
//   const pollId = parseInt(searchParams.pollId, 10);

//   if (isNaN(pollId)) {
//     return <div>Invalid poll ID</div>;
//   }
//   return (
//     <div>
//       <h1>Thank you for participating in this poll!</h1>
//       <p>Your response has been recorded.</p>
//       <PollResults pollId={pollId} />
//       <Link href="/">Return Home</Link>
//     </div>
//   );
// }
