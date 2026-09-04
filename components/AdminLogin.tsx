"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      setError("This email does not have admin access.");
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <span className="admin-brand-mark">R</span>
        <span className="admin-kicker">Ritbha / Private area</span>
        <h1>Welcome back.</h1>
        <p>Enter your authorized email to open the studio control room.</p>
        <form onSubmit={submit}>
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {error && <span className="admin-login-error">{error}</span>}
          <button type="submit" disabled={loading} className="admin-primary-button">
            {loading ? "Checking..." : "Enter dashboard"} <span>→</span>
          </button>
        </form>
        <a href="/" className="admin-back-link">← Back to website</a>
      </div>
    </main>
  );
}
