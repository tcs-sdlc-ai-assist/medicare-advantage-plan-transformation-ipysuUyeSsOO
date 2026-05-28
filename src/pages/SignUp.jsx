import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

/**
 * Mock Sign Up Page
 * Simulates sign up flow, creates demo user in context/localStorage.
 * No real provisioning.
 */
function SignUp() {
  const { login } = useContext(AppContext);
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const roles = [
    { value: 'member', label: 'Member' },
    { value: 'provider', label: 'Provider' },
    { value: 'admin', label: 'Admin' },
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // Simulate async sign up
      await new Promise(resolve => setTimeout(resolve, 700));
      if (!username || !password || !email) {
        setError('Username, password, and email are required.');
        setLoading(false);
        return;
      }
      // Demo user data
      const userData = {
        username,
        displayName: username.charAt(0).toUpperCase() + username.slice(1),
        role,
        email,
      };
      const sessionData = {
        token: 'demo-token-' + Date.now(),
        expires: new Date(Date.now() + 3600 * 1000).toISOString(),
      };
      login(userData, role, sessionData);
      setSuccess('Sign up successful! You are now logged in.');
      setLoading(false);
    } catch (err) {
      setError('Sign up failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Demo Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={role}
              onChange={e => setRole(e.target.value)}
              disabled={loading}
            >
              {roles.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm">{success}</div>
          )}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition-colors ${
              loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-gray-500 text-xs text-center">
          This is a mock sign up. No real provisioning. Choose any username, email, password, and role.
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = {};

export default SignUp;