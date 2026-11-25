import Link from "next/link";

interface PhotoCredit {
  label: string;
  license: string;
}

export function MastFooter({
  whatsappUrl,
  credits = [],
}: {
  whatsappUrl: string;
  credits?: PhotoCredit[];
}) {
  return (
    <footer className="mast-footer studio-proof" aria-label="Maklumat penutup portofolio">
      <div className="container">
        <div className="mast-wordmark" data-reveal>
          NextProp4U
        </div>

        <div className="mast-meta-grid">
          <div className="space-y-1">
            <p className="font-display text-xl text-[var(--color-ink)]">
              Muhammad Norafif
            </p>
            <p className="text-sm text-[var(--color-ink-2)]">
              Perunding Berdaftar Maxxan Realty
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              Berpangkalan di Setapak, Kuala Lumpur. Liputan seluruh KL dan Selangor
            </p>
          </div>

          <nav className="mast-links" aria-label="Pautan pantas penutup">
            <a href="#koridor">Kawasan Liputan</a>
            <a href="#servis">Khidmat Hartanah</a>
            <a href="#pendekatan">Pendekatan</a>
            <a href="#kalkulator">Kalkulator</a>
            <a href="#soalan">Soalan Lazim</a>
            <a href="tel:+601158683907">+6011-5868 3907</a>
            <a href={whatsappUrl}>WhatsApp Afif</a>
            <Link href="/login">Portal Ejen</Link>
          </nav>
        </div>

        <div className="mast-legal">
          <p>
            Perkhidmatan perundingan hartanah profesional di bawah naungan agensi Maxxan Realty Sdn Bhd.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Hak Cipta © 2026 Muhammad Norafif, NextProp4U.
          </p>
          {credits.length > 0 && (
            <p className="mast-credits" data-credits="true">
              Kredit fotografi arkib:{" "}
              {credits.map((c, i) => (
                <span key={c.label}>
                  {i > 0 ? ", " : ""}
                  {c.label} ({c.license})
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
