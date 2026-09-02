// frontend/src/services/auth.js
// Lightweight auth service for Vite + React.
// Uses VITE_API_URL environment variable (import.meta.env.VITE_API_URL).

const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function request(path, body) {
  const res = await fetch(`${baseUrl}/backend/${path}.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({ error: 'Invalid JSON response' }));
  if (!res.ok) throw json;
  return json;
}

export function register({ email, password, name }) {
  return request('register', { email, password, name });
}

export function login({ email, password }) {
  return request('login', { email, password });
}

export function requestReset({ email }) {
  return request('request_reset', { email });
}

export function resetPassword({ token, password }) {
  return request('reset_password', { token, password });
}
