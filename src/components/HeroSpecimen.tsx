"use client";

import { useEffect, useState } from "react";

export function HeroSpecimen({
  generalWhatsappUrl,
}: {
  generalWhatsappUrl: string;
}) {
  const [zoomOpen, setZoomOpen] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    if (zoomOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [zoomOpen]);

  return (
    <section className="hero-section studio-proof studio-proof--fade">
      <div className="container">
        {/* Top Editorial Identity Header */}
        <div className="hero-mast-top" data-reveal>
          <div className="hero-mast-eyebrow">
            <span className="hero-pill">
              <span className="hero-pill-dot" />
              Perunding Hartanah Berdaftar
            </span>
            <span className="hero-mast-sep">/</span>
            <span className="hero-mast-agency">Maxxan Realty Sdn Bhd</span>
            <span className="hero-mast-sep">/</span>
            <span className="hero-mast-loc">Berpangkalan di Setapak, KL (Liputan KL &amp; Selangor)</span>
          </div>

          <div className="hero-name-banner">
            <span className="hero-name-wordmark">Muhammad Norafif</span>
          </div>
        </div>

        {/* Hero 2-Column Stage: Left Copy & Trust Highlights, Right Grand Portrait */}
        <div className="stage-grid">
          <div className="stage-copy" data-reveal>
            <div className="stage-copy__main">
              <h1>Urus hartanah Kuala Lumpur dan Selangor.</h1>
              <p className="lead">
                Semakan nilai pasaran JPPH, saringan kelayakan pinjaman bank dan pengurusan guaman lengkap dari carian hingga serahan kunci.
              </p>

              {/* 4 Trust Highlights */}
              <div className="hero-highlights">
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Pangkalan Utama</span>
                  <strong className="hero-highlight-val">Setapak, Kuala Lumpur</strong>
                </div>
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Kawasan Liputan</span>
                  <strong className="hero-highlight-val">Seluruh KL &amp; Selangor</strong>
                </div>
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Pematuhan Sah</span>
                  <strong className="hero-highlight-val">Akaun Klien LPPEH</strong>
                </div>
                <div className="hero-highlight-item">
                  <span className="hero-highlight-label">Julat Transaksi</span>
                  <strong className="hero-highlight-val">Sewa RM 700+ | Jual RM 2.0M</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="stage-actions">
                <a href={generalWhatsappUrl} className="btn btn--primary crop">
                  WhatsApp Afif (+6011-5868 3907)
                </a>
                <a href="#kalkulator" className="btn btn--quiet crop">
                  Semak Kelayakan DSR
                </a>
              </div>
            </div>
          </div>

          {/* Right: Grand, High-Definition Featured Portrait of Muhammad Norafif with Zoom Lightbox */}
          <div className="hero-portrait-stage" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="sheet crop crop--plate hero-portrait-card">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="hero-portrait-button group"
                aria-label="Besarkan potret rasmi Muhammad Norafif (klik untuk zum)"
              >
                <div className="hero-portrait-image-wrap">
                  <img
                    src="/images/afif-editorial-portrait.jpg"
                    width={2048}
                    height={2048}
                    alt="Potret editorial rasmi Muhammad Norafif, Perunding Hartanah Berdaftar Maxxan Realty"
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
                      Klik untuk besarkan potret
                    </span>
                  </div>
                </div>
              </button>

              <div className="hero-portrait-caption">
                <div className="min-w-0">
                  <strong className="hero-portrait-caption-name">Muhammad Norafif</strong>
                  <span className="hero-portrait-caption-role">Perunding Hartanah Berdaftar (LPPEH)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="hero-portrait-caption-action"
                >
                  Zum Resolusi Penuh ↗
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
                  Perunding Hartanah Maxxan Realty Sdn Bhd · Berpangkalan di Setapak, KL
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
                src="/images/afif-editorial-portrait.jpg"
                width={2048}
                height={2048}
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
