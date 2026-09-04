"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm the Ritbha assistant. Ask me about services, pricing, or how to get started.",
};

const QUICK_OPTIONS = [
  { label: "View services", prompt: "What services do you offer?" },
  { label: "See pricing", prompt: "What are your service prices?" },
  { label: "Ask about timeline", prompt: "How long does a typical project take?" },
  { label: "How do I get started?", prompt: "How can I get started with Ritbha?" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(prompt?: string) {
    const text = (prompt ?? input).trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Chat request failed");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the assistant just now — feel free to use the contact form below instead.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="font-display text-sm">Ritbha Assistant</p>
              <p className="text-[11px] text-muted">Usually replies in seconds</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-muted hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-accent text-bg"
                    : "bg-surface2 text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-xl bg-surface2 px-3 py-2 text-sm text-muted">
                Typing…
              </div>
            )}
          </div>

          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {QUICK_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => send(option.prompt)}
                  className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about pricing, timelines…"
              className="flex-1 rounded-full border border-line bg-bg px-4 py-2 text-sm outline-none placeholder:text-muted focus:border-accent/50"
            />
            <button
              onClick={() => send()}
              disabled={loading}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-bg shadow-xl transition-transform hover:-translate-y-0.5"
      >
        {open ? "Close" : "💬 Chat with us"}
      </button>
    </div>
  );
}
