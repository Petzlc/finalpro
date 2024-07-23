'use client';

import { useRouter } from 'next/navigation';
import styles from '../../../app/profile/[username]/Profile.module.scss';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.logoutButton}
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        logout
      </button>
    </form>
  );
}

// import it to layout
// <LogoutButton />
