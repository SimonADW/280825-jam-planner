'use client';

import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import styles from './SessionForm.module.css';

export default function SessionForm({ onSessionCreated }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    setlist: '',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Du må være logget inn for å opprette en økt');
      return;
    }

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.uid,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Noe gikk galt');

      const newSession = await response.json();
      setFormData({
        title: '',
        date: '',
        location: '',
        setlist: '',
        notes: '',
      });
      
      if (onSessionCreated) {
        onSessionCreated(newSession);
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Kunne ikke opprette økten');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Dato</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location">Sted</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="setlist">Set-liste</label>
        <textarea
          id="setlist"
          name="setlist"
          value={formData.setlist}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="notes">Notater</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Opprett økt
      </button>
    </form>
  );
}
