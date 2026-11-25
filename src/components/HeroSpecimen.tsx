'use client';

import { useEffect, useState } from "react";

export function HeroSpecimen({ generalWhatsappUrl }: { generalWhatsappUrl: string }) {
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomOpen(false);
      }
    };
    if (zoomOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [zoomOpen]);

  return (
    <section className="hero-section studio-proof studio-proof--fade">
      <div className="container">
        {/* Hero 2-Column Stage: Left Copy & Trust Highlights, Right Grand Portrait */}
        <div className="stage-grid">
          <div className="stage-copy" data-reveal>
            <div className="stage-copy__main">
              {/* Identity & Name moved directly to left side above headline */}
              <div className="hero-identity-left">
                <div className="hero-identity-badges">
                  <div className="hero-pill">
                    <span className="hero-pill-dot" />
                    Perunding Berdaftar Maxxan Realty
                  </div>
                  <div className="hero-agency-tag">
                    Maxxan Realty Sdn Bhd
                  </div>
                </div>
                <div className="hero-name-left">
                  Muhammad Norafif
                </div>
              </div>

              <h1>Urus hartanah Kuala Lumpur dan Selangor.</h1>
              <p className="lead">
                Semakan nilai pasaran JPPH, saringan kelayakan pinjaman bank dan pengurusan guaman lengkap dari carian hingga serahan kunci.
              </p>

              {/* 3 Trust Highlights (Julat Transaksi removed) */}
              <div className="hero-highlights">
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Lokasi Utama</span>
                  <strong className="hero-highlight-val">Setapak, Kuala Lumpur</strong>
                </div>
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Kawasan Liputan</span>
                  <strong className="hero-highlight-val">Seluruh KL &amp; Selangor</strong>
                </div>
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Status Agensi</span>
                  <strong className="hero-highlight-val">Maxxan Realty Sdn Bhd</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="stage-actions">
                <a href={generalWhatsappUrl} className="btn btn--primary">
                  WhatsApp Afif (+6011-5868 3907)
                </a>
                <a href="#kalkulator" className="btn btn--quiet">
                  Semak Kelayakan Pinjaman (DSR)
                </a>
              </div>
            </div>
          </div>

          {/* Right: Grand, High-Definition Featured Portrait of Muhammad Norafif with Zoom Lightbox */}
          <div className="hero-portrait-stage" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="sheet hero-portrait-card">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="hero-portrait-button group"
                aria-label="Besarkan potret rasmi Muhammad Norafif (klik untuk zoom)"
              >
                <div className="hero-portrait-image-wrap">
                  <img
                    src="/images/please_follow_my_picture_and_3de36cdc_2K.jpg"
                    width={2752}
                    height={1536}
                    alt="Potret rasmi Muhammad Norafif, Perunding Berdaftar Maxxan Realty"
                    className="hero-portrait-img"
                    fetchPriority="high"
                  />
                  {/* Subtle interactive zoom prompt overlay */}
                  <div className="hero-portrait-overlay">
                    <span className="hero-zoom-badge">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      Klik untuk zoom potret
                    </span>
                  </div>
                </div>
              </button>

              <div className="hero-portrait-caption">
                <div className="min-w-0">
                  <strong className="hero-portrait-caption-name">Muhammad Norafif</strong>
                  <span className="hero-portrait-caption-role">Perunding Berdaftar Maxxan Realty</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="hero-portrait-caption-action"
                >
                  Zoom Resolusi Penuh ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Potret rasmi Muhammad Norafif"
          className="hero-lightbox"
          onClick={() => setZoomOpen(false)}
        >
          <div className="hero-lightbox-backdrop" />
          <div
            className="hero-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hero-lightbox-header">
              <div>
                <strong className="text-base font-display text-[var(--color-paper)]">Muhammad Norafif</strong>
                <span className="text-xs text-[var(--color-paper-2)] block">
                  Perunding Berdaftar Maxxan Realty · Lokasi di Setapak, KL
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                className="hero-lightbox-close"
                aria-label="Tutup paparan potret"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="hero-lightbox-media">
              <img
                src="/images/please_follow_my_picture_and_3de36cdc_2K.jpg"
                width={2752}
                height={1536}
                alt="Potret rasmi Muhammad Norafif, resolusi penuh 2K"
                className="hero-lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
