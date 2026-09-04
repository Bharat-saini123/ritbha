"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });

    if (!response.ok) {
      setError("That secret is not valid.");
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
        <p>Enter the private secret to open the studio control room.</p>
        <form onSubmit={submit}>
          <label htmlFor="admin-secret">Private secret</label>
          <input
            id="admin-secret"
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            placeholder="Enter your secret"
            autoComplete="current-password"
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
