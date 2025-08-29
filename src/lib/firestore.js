import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

// User Operations
export async function createUser(uid, userData) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return userRef;
}

export async function getUser(uid) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}

// Session Operations
export async function createSession(sessionData) {
  const sessionsRef = collection(db, 'sessions');
  return addDoc(sessionsRef, {
    ...sessionData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSession(sessionId, sessionData) {
  const sessionRef = doc(db, 'sessions', sessionId);
  return updateDoc(sessionRef, {
    ...sessionData,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSession(sessionId) {
  const sessionRef = doc(db, 'sessions', sessionId);
  return deleteDoc(sessionRef);
}

export async function getUserSessions(userId) {
  const sessionsRef = collection(db, 'sessions');
  const q = query(
    sessionsRef,
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getSession(sessionId) {
  const sessionRef = doc(db, 'sessions', sessionId);
  const sessionSnap = await getDoc(sessionRef);
  return sessionSnap.exists() ? { id: sessionSnap.id, ...sessionSnap.data() } : null;
}
