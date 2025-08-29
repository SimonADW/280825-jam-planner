import { adminDb } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

/**
 * Route handlers for /api/sessions
 * Uses Firebase Admin SDK to bypass Firestore security rules
 */

export async function GET(request) {
  try {
    // Get and validate user ID
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - User ID required' }, { status: 401 });
    }

    // Query sessions for user
    const snapshot = await adminDb
      .collection('sessions')
      .where('userId', '==', userId)
      .get();

    // Transform and return results
    const sessions = [];
    snapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(sessions);

  } catch (error) {
    console.error('Sessions API Error:', {
      code: error.code,
      message: error.message
    });
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Get and validate user ID
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - User ID required' }, { status: 401 });
    }

    // Create new session
    const data = await request.json();
    const newSession = {
      ...data,
      userId,
      createdAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection('sessions').add(newSession);
    return NextResponse.json({ id: docRef.id, ...newSession });

  } catch (error) {
    console.error('Sessions API Error:', {
      code: error.code,
      message: error.message
    });
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
}
