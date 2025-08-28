'use client';

import { useAuth } from './AuthContext';
import styles from './LoginButton.module.css';

export default function LoginButton() {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleAuth = async () => {
    if (user) {
      await logout();
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <button className={styles.button} onClick={handleAuth}>
      {user ? 'Logg ut' : 'Logg inn med Google'}
    </button>
  );
}
