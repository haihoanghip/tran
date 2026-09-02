import React, { useState, useEffect } from 'react';
import { resetPassword } from '../../services/auth';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token') || '';
    setToken(t);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!token) return alert('Missing token');
    setLoading(true);
    try {
      const res = await resetPassword({ token, password });
      alert(res.message || 'Password updated');
      setPassword('');
    } catch (err) {
      alert(err.error || JSON.stringify(err));
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Reset password</h3>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="New password (min 8)" required />
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Reset password'}</button>
    </form>
  );
}
