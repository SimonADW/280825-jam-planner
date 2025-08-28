'use client';

import { AuthProvider } from '@/features/auth/AuthContext';
import LoginButton from '@/features/auth/LoginButton';
import SessionForm from '@/features/sessions/SessionForm';
import SessionsList from '@/features/sessions/SessionsList';
import styles from './page.module.css';

export default function Home() {
  return (
    <AuthProvider>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Jam Planner</h1>
          <LoginButton />
        </header>
        
        <div className={styles.content}>
          <section className={styles.formSection}>
            <h2>Opprett ny økt</h2>
            <SessionForm />
          </section>
          
          <section className={styles.listSection}>
            <h2>Dine økter</h2>
            <SessionsList />
          </section>
        </div>
      </main>
    </AuthProvider>
  );
}

