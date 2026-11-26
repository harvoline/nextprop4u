"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { BrandMark } from "../../components/BrandMark";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMagicLink, setIsMagicLink] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const errorParam = params.get("error");
    const errorDesc = params.get("error_description");

    if (errorDesc) {
      setError(decodeURIComponent(errorDesc).replace(/\+/g, " "));
      return;
    } else if (errorParam) {
      setError("Pautan pengesahan telah tamat tempoh atau tidak sah. Sila mohon pautan baharu.");
      return;
    }

    if (code) {
      setLoading(true);
      setMessage("Mengesahkan sesi log masuk anda...");
      const supabase = createClient();
      supabase.auth.exchangeCodeForSession(code).then(({ data, error: exchangeError }) => {
        if (exchangeError) {
          console.error("Code exchange error:", exchangeError);
          setError("Pautan log masuk telah tamat tempoh atau telah digunakan. Sila mohon pautan baharu di bawah.");
          setLoading(false);
          setMessage(null);
        } else if (data.session) {
          const redirectTo = params.get("redirectTo") || "/dashboard";
          window.location.href = redirectTo;
        }
      });
    }

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        const redirectTo = params.get("redirectTo") || "/dashboard";
        window.location.href = redirectTo;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const normalizedEmail = email.trim().toLowerCase();
    const allowedEmails = [
      "mohd.norafif@gmail.com",
      ...(process.env.NEXT_PUBLIC_ADMIN_EMAIL ? [process.env.NEXT_PUBLIC_ADMIN_EMAIL.toLowerCase()] : []),
    ];

    if (!allowedEmails.includes(normalizedEmail)) {
      setLoading(false);
      setError("Akses disekat: Portal CRM ini dikhaskan untuk Muhammad Norafif (NextProp4U) sahaja.");
      return;
    }

    try {
      const supabase = createClient();
      if (isMagicLink) {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: normalizedEmail,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=/dashboard`,
          },
        });
        if (otpError) throw otpError;
        setMessage("Pautan log masuk (Magic Link) telah dihantar ke emel anda.");
      } else {
        const { error: pwdError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (pwdError) throw pwdError;
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      let msg = err instanceof Error ? err.message : null;
      if (msg && msg.toLowerCase().includes("rate limit")) {
        msg = "Had penghantaran emel Supabase dicapai (rate limit). Sila tunggu 10-15 minit atau gunakan mod 'Gunakan kata laluan biasa'.";
      } else if (msg && msg.toLowerCase().includes("invalid login credentials")) {
        msg = "Kata laluan tidak sah atau akaun belum didaftarkan di Supabase.";
      }
      setError(msg || "Ralat semasa log masuk. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="studio-proof min-h-screen flex flex-col justify-between py-6 sm:py-8">
      <div className="container flex items-center justify-between gap-3 border-b border-[var(--color-rule)] pb-4">
        <Link href="/" className="nav-brand min-w-0">
          <BrandMark />
          <span className="nav-brand__wordmark">NextProp4U</span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium whitespace-nowrap shrink-0 text-[var(--color-ink-2)] hover:text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-4"
        >
          Laman Utama
        </Link>
      </div>

      <div className="container my-8 sm:my-12">
        <div className="w-full max-w-[440px] mx-auto sheet p-6 sm:p-10">
        <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-[var(--color-rule)] w-full">
          {/* Row 1: Image in its own row */}
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-[var(--color-accent)] shadow-sm shrink-0">
            <img
              src="/images/please_follow_my_picture_and_3de36cdc_2K.jpg"
              width={2752}
              height={1536}
              alt="Muhammad Norafif, Perunding Berdaftar Maxxan Realty"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Row 2: Text in its own row */}
          <div className="w-full flex flex-col items-center text-center">
            <h1
              className="w-full max-w-full font-display text-[var(--text-2xl)] leading-[1.15] text-[var(--color-ink)] text-center mx-auto"
              style={{ textAlign: "center" }}
            >
              Agent Login &amp; CRM
            </h1>
            <p
              className="w-full max-w-[32ch] text-sm text-[var(--color-muted)] mt-1.5 mx-auto text-center"
              style={{ textAlign: "center" }}
            >
              Log masuk untuk akses inventori hartanah dan rekod leads
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 p-3.5 rounded-[2px] border border-[var(--color-ink)] bg-[var(--color-paper-2)] text-sm text-center text-[var(--color-ink)]"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-[2px] border border-[var(--color-accent)] bg-[var(--color-paper-2)] text-sm text-center text-[var(--color-ink)]"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="field-group">
            <label htmlFor="login-email" className="field-label">
              Alamat Emel
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="studio-input"
            />
          </div>

          {!isMagicLink && (
            <div className="field-group">
              <label htmlFor="login-password" className="field-label">
                Kata Laluan
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata laluan"
                className="studio-input"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn--primary w-full mt-2"
          >
            {loading
              ? "Sedang memproses..."
              : isMagicLink
                ? "Hantar Pautan Log Masuk"
                : "Log Masuk"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[var(--color-rule)] text-center">
          <button
            type="button"
            onClick={() => setIsMagicLink(!isMagicLink)}
            className="inline-flex items-center justify-center min-h-[38px] px-3 text-sm text-[var(--color-ink-2)] hover:text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-4"
          >
            {isMagicLink
              ? "Gunakan kata laluan biasa"
              : "Gunakan Magic Link emel"}
          </button>
        </div>
        </div>
      </div>

      <div className="container text-center text-xs text-[var(--color-muted)] pt-4 border-t border-[var(--color-rule)]">
        Maxxan Realty Sdn Bhd, Portal Pengurusan Dalaman Perunding Hartanah
      </div>
    </main>
  );
}
