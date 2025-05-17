import React from 'react';
import './pages.css';

const RegisterPage = () => {
  return (
    <div className="register">
      <h1>Create your account</h1>

      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          required
        />
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          required
        />

        <button type="submit">Register</button>
      </form>

      <p className="subtext">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default RegisterPage;
