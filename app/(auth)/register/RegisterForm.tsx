'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import { RegisterResponseBodyPost } from '../api/register/route';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });
    // for console.log
    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);

      return;
    }

    // Redirect from the successful registration to the profile

    router.push(`/profile/${data.user.userName}`);

    router.refresh();
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formElement}>
        <div className={styles.formTitle}>Sign Up</div>
        <form
          className={styles.form}
          onSubmit={async (event) => await handleRegister(event)}
        >
          <label className={styles.label}>
            userName
            <input
              className={styles.input}
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>
          <button className={styles.button}>Sign Up</button>

          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              <ErrorMessage>{error.message}</ErrorMessage>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
