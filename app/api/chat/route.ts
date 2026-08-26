import { NextRequest, NextResponse } from "next/server";
import { chatContext } from "@/lib/data";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error("[chat] GROQ_API_KEY is missing");

      return NextResponse.json(
        { error: "Groq API key is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: chatContext,
          },
          ...messages,
        ],
        temperature: 0.6,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[chat] Groq API error:", response.status, data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Groq assistant is unavailable right now.",
        },
        { status: response.status }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I didn't catch that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chat] request failed:", error);

    return NextResponse.json(
      { error: "Unable to connect to Groq right now." },
      { status: 500 }
    );
  }
}