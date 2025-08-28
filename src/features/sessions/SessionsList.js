'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import styles from './SessionsList.module.css';

export default function SessionsList() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSessions();
    } else {
      setSessions([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions', {
        headers: {
          'x-user-id': user.uid,
        },
      });

      if (!response.ok) throw new Error('Kunne ikke hente økter');

      const data = await response.json();
      setSessions(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Laster...</div>;
  if (!user) return <div>Logg inn for å se dine økter</div>;
  if (sessions.length === 0) return <div>Ingen økter funnet</div>;

  return (
    <div className={styles.sessionsList}>
      {sessions.map((session) => (
        <div key={session.id} className={styles.sessionCard}>
          <h3>{session.title}</h3>
          <p className={styles.date}>
            {new Date(session.date).toLocaleString('nb-NO', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </p>
          <p className={styles.location}>{session.location}</p>
          {session.setlist && (
            <div className={styles.setlist}>
              <h4>Set-liste:</h4>
              <p>{session.setlist}</p>
            </div>
          )}
          {session.notes && (
            <div className={styles.notes}>
              <h4>Notater:</h4>
              <p>{session.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
