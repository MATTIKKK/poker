import React from 'react';
import './pages.css';

const LoginPage = () => {
  return (
    <div className="login">
      <h1>Sign in to the table</h1>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
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
