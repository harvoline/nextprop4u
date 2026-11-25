"use client";

import { useState } from "react";
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createClient();
      if (isMagicLink) {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (otpError) throw otpError;
        setMessage("Pautan log masuk (Magic Link) telah dihantar ke emel anda.");
      } else {
        const { error: pwdError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (pwdError) throw pwdError;
        window.location.href = "/dashboard";
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : null;
      setError(msg || "Ralat semasa log masuk. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="studio-proof min-h-screen flex flex-col justify-between px-4 py-8">
      <div className="container flex items-center justify-between gap-4 border-b border-[var(--color-rule)] pb-4">
        <Link href="/" className="nav-brand">
          <BrandMark />
          <span className="nav-brand__wordmark">NextProp4U</span>
        </Link>
        <Link
          href="/"
          className="text-sm font-medium whitespace-nowrap text-[var(--color-ink-2)] hover:text-[var(--color-ink)] underline decoration-[var(--color-rule)] underline-offset-4"
        >
          Laman Utama
        </Link>
      </div>

      <div className="w-full max-w-[440px] mx-auto my-12 sheet crop p-8 sm:p-10">
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[var(--color-rule)]">
          <div className="principal-portrait">
            <img
              src="/images/afif-editorial-portrait.jpg"
              width={2048}
              height={2048}
              alt="Muhammad Norafif, Perunding Hartanah"
            />
          </div>
          <div>
            <h1 className="font-display text-[var(--text-2xl)] leading-[1.1] text-[var(--color-ink)]">
              Portal Ejen &amp; CRM
            </h1>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Log masuk untuk akses inventori dan rekod leads
            </p>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className="mb-5 p-3.5 rounded-[2px] border border-[var(--color-ink)] bg-[var(--color-paper-2)] text-sm text-[var(--color-ink)]"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-[2px] border border-[var(--color-accent)] bg-[var(--color-paper-2)] text-sm text-[var(--color-ink)]"
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
            className="btn btn--primary crop w-full mt-2"
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

      <div className="container text-center text-xs text-[var(--color-muted)] pt-4 border-t border-[var(--color-rule)]">
        Maxxan Realty Sdn Bhd, Portal Pengurusan Dalaman Perunding Hartanah
      </div>
    </main>
  );
}
