import React, { useState } from 'react';
import './pages.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.msg || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      console.log("data user", data)
      alert('Login Successful');

      const redirectTo = localStorage.getItem('redirectAfterAuth') || '/';
      localStorage.removeItem('redirectAfterAuth');
      navigate(redirectTo);
    } catch (error) {
      console.error(error);
      alert('Something goes wrong, broo!');
    }
  };

  return (
    <div className="login">
      <h1>Sign in to the table</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit">Log in</button>
      </form>

      <p className="subtext">
        Don’t have an account? <a href="/register">Register now</a>
      </p>
    </div>
  );
};

export default LoginPage;
