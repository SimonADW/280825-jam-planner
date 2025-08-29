/**
 * Firebase Admin SDK initialization
 * Used for server-side operations to bypass Firestore security rules
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (or reuse existing instance)
const firebaseAdmin = getApps().length === 0 
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      })
    })
  : getApps()[0];

export const adminDb = getFirestore(firebaseAdmin);
