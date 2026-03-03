import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthProvider";
import "./AuthPages.css";

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { loginHandler } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await loginHandler({ email, password });
    } catch (err) {
      setMessage(err?.message || "Login failed. Please check credentials.");
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-brand">
            <div className="auth-brand-icon">C</div>
            <span className="auth-brand-name">
              CONVER<em>SIO</em>
            </span>
          </div>

          <div className="left-copy">
            <div className="left-pre">Welcome back</div>
            <div className="left-head">
              Your team is
              <br />
              waiting for <em>you.</em>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-eye">&#10022;</div>
          <div className="form-title">Welcome back</div>
          <div className="form-sub">Log in to your Conversio account.</div>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label" htmlFor="loginEmail">
                Email
              </label>
              <input
                id="loginEmail"
                className="auth-input"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <div className="field-row">
                <label className="field-label" htmlFor="loginPassword">
                  Password
                </label>
                <button type="button" className="forgot-btn">
                  Forgot password?
                </button>
              </div>
              <input
                id="loginPassword"
                className="auth-input"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Log in
            </button>

            {message && <p className="error-text">{message}</p>}
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button type="button" className="google-btn">
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="form-footer">
            No account yet? <Link to="/signin">Sign up free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
