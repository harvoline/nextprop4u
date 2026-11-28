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
              Lokasi di Setapak, Kuala Lumpur. Liputan seluruh KL dan Selangor
            </p>
          </div>

          <nav className="mast-links" aria-label="Pautan pantas penutup">
            <Link href="/#koridor">Kawasan Liputan</Link>
            <Link href="/#servis">Khidmat Hartanah</Link>
            <Link href="/#pendekatan">Pendekatan</Link>
            <Link href="/kalkulator">Koleksi Kalkulator</Link>
            <Link href="/kalkulator/pinjaman-perumahan">Kalkulator Pinjaman</Link>
            <Link href="/kalkulator/duti-setem-legal-fee">Duti Setem &amp; SPA</Link>
            <Link href="/kalkulator/rental-yield">Rental Yield</Link>
            <Link href="/kalkulator/tenancy-agreement">Tenancy Agreement</Link>
            <Link href="/#soalan">Soalan Lazim</Link>
            <a href="tel:+601158683907">+6011-5868 3907</a>
            <a href={whatsappUrl}>WhatsApp Afif</a>
          </nav>
        </div>

        <div className="mast-legal">
          <p>
            Perkhidmatan perundingan hartanah profesional di bawah naungan agensi Maxxan Realty Sdn Bhd.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Hak Cipta Â© 2026 Muhammad Norafif, NextProp4U.
          </p>
          {credits.length > 0 && (
            <p className="mast-credits" data-credits="true">
              Kredit Foto:{" "}
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
