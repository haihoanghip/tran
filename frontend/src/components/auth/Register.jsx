import React, { useState } from 'react';
import { register } from '../../services/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register({ email, password, name });
      alert(res.message || 'Registered');
      setEmail(''); setPassword(''); setName('');
    } catch (err) {
      alert(err.error || JSON.stringify(err));
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <h3>Register</h3>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
      <br />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
      <br />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password (min 8)" required />
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
    </form>
  );
}
