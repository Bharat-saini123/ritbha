"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function ReviewForm() {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (status === "loading") return null;
  if (!session) {
    return (
      <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
        <div><p className="font-display text-xl text-ink">Worked with us?</p><p className="mt-1 text-sm text-muted">Sign in with Google to share your experience.</p></div>
        <button type="button" onClick={() => signIn("google")} className="rounded-full border border-line px-5 py-3 text-sm text-ink transition hover:border-accent hover:text-accent">Continue with Google</button>
      </div>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rating, comment }) });
    const result = await response.json();
    setMessage(response.ok ? "Review submitted successfully. Thank you for sharing your experience." : result.error || "Could not save your review.");
    setSaving(false);
    if (response.ok) {
      setComment("");
      setSubmitted(true);
    }
  }

  return (
    <form onSubmit={submit} className="mt-12 border-t border-line pt-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        <div className="flex-1"><p className="font-display text-xl text-ink">Rate your experience</p><p className="mt-1 text-sm text-muted">Signed in as {session.user?.name || session.user?.email}.</p></div>
        <div className="flex gap-1" aria-label="Choose a rating">
          {Array.from({ length: 5 }, (_, index) => <button key={index} type="button" onClick={() => setRating(index + 1)} className={`text-2xl ${index < rating ? "star-filled" : "star-empty"}`} aria-label={`${index + 1} stars`}>★</button>)}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row"><textarea required minLength={10} maxLength={500} value={comment} onChange={(event) => setComment(event.target.value)} disabled={submitted} placeholder={submitted ? "Your review has been submitted" : "Tell us about your experience..."} className="min-h-20 flex-1 resize-y rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-accent disabled:cursor-not-allowed disabled:opacity-60" /><button disabled={saving || submitted} className="review-publish-button" aria-label={submitted ? "Review submitted" : saving ? "Saving review" : "Publish review"}>{submitted ? "Submitted" : saving ? "Saving..." : "Publish review"}</button></div>
      {message && <p className={submitted ? "review-success-message" : "mt-3 text-sm text-muted"} role="status">{message}</p>}
    </form>
  );
}
