import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ritbha — Root. Build. Grow. | Full-Stack Web Studio",
  description:
    "Ritbha is a full-stack web studio building real-time, cloud-ready products on Next.js, Node.js and PostgreSQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jbmono.variable}`}>
      <body className="bg-bg text-ink font-body antialiased">

        {/* ── Global background video (fixed, behind every section) ──────── */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.18,
            }}
          >
            {/* Your own video from /public */}
            <source
              src="https://res.cloudinary.com/tfblbs0v/video/upload/8720758-uhd_4096_2160_25fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark overlay — keeps text readable across every section */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(11,15,26,0.72) 0%, rgba(11,15,26,0.55) 50%, rgba(11,15,26,0.72) 100%)",
            }}
          />
        </div>
        {/* ─────────────────────────────────────────────────────────────── */}

        {children}
      </body>
    </html>
  );
}

