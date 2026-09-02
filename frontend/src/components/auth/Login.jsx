import React, { useState } from 'react';
import { login } from '../../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password });
      alert(res.message || 'Logged in');
      // on success you might redirect or update app state
    } catch (err) {
      alert(err.error || JSON.stringify(err));
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Login</h3>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <br />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" required />
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Login'}</button>
    </form>
  );
}
