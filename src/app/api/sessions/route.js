import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const userId = request.headers.get('x-user-id');
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    const sessions = [];
    snapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const userId = request.headers.get('x-user-id');
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const sessionsRef = collection(db, 'sessions');
    const newSession = {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    };
    
    const docRef = await addDoc(sessionsRef, newSession);
    return NextResponse.json({ id: docRef.id, ...newSession });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
