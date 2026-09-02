import React, { useState } from 'react';
import { requestReset } from '../../services/auth';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await requestReset({ email });
      alert(res.message || 'If an account exists, a reset link has been sent');
      setEmail('');
    } catch (err) {
      alert(err.error || JSON.stringify(err));
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Request password reset</h3>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</button>
    </form>
  );
}
