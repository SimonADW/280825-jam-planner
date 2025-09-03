import React from 'react'
import SessionForm from '@/features/sessions/SessionForm';
import SessionsList from '@/features/sessions/SessionsList';
import styles from './page.module.css';

export const metadata = {
  title: "Plan ze jams",
  desciption: "Plan ze übungs"
}

function JamPlannerPage() {
  return (
    <main className={styles.main}>
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

  )
}

export default JamPlannerPage;