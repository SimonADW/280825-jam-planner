'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { fetchUserSessions } from '@/services/sessionService';
import styles from './SessionsList.module.css';

export default function SessionsList() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log('User authenticated:', {
        uid: user.uid,
        email: user.email,
        isAnonymous: user.isAnonymous
      });
      fetchSessions();
    } else {
      console.log('No user authenticated');
      setSessions([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      if (!user?.uid) {
        console.error('No user or user.uid available');
        return;
      }

      const data = await fetchUserSessions(user.uid);
      setSessions(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error.message);
      setLoading(false);
      // You could also set an error state here to show to the user
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
