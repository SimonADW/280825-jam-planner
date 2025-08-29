/**
 * Session-related API calls
 */

/**
 * Fetch all sessions for a user
 * @param {string} userId - The ID of the user whose sessions to fetch
 * @returns {Promise<Array>} Array of session objects
 */
export async function fetchUserSessions(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await fetch('/api/sessions', {
    headers: {
      'x-user-id': userId,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error('Could not fetch sessions: ' + (error.details || error.error));
  }

  return response.json();
}

/**
 * Create a new session
 * @param {string} userId - The ID of the user creating the session
 * @param {Object} sessionData - The session data to create
 * @returns {Promise<Object>} The created session object
 */
export async function createSession(userId, sessionData) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'x-user-id': userId,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error('Could not create session: ' + (error.details || error.error));
  }

  return response.json();
}
