"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function StudioNavbar({ whatsappUrl }: { whatsappUrl: string }) {
  const [retracted, setRetracted] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 24);
      if (y > 160 && y > lastY + 8) {
        setRetracted(true);
      } else if (y < lastY - 8 || y <= 80) {
        setRetracted(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Langkau ke kandungan utama
      </a>

      {/* Banner above retracting nav bar */}
      <div className="top-banner">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "var(--banner-height)",
            gap: "var(--space-sm)",
          }}
        >
          <span>
            Maxxan Realty:<span className="banner-extended"> Perunding Hartanah Setapak, KL (Liputan Kuala Lumpur &amp; Selangor)</span>
            <span className="banner-compact"> KL &amp; Selangor</span>
          </span>
          <a href="tel:+601158683907">+6011-5868 3907</a>
        </div>
      </div>

      <header
        className={`studio-nav studio-proof ${stuck ? "is-stuck" : ""} ${
          retracted && !menuOpen ? "is-retracted" : ""
        }`}
      >
        <div className="container studio-nav__row">
          <Link href="/" className="nav-brand" aria-label="NextProp4U halaman utama">
            <BrandMark />
            <span className="nav-brand__wordmark">NextProp4U</span>
          </Link>

          <nav className="nav-links nav-links--desktop" aria-label="Navigasi utama">
            <a href="#koridor" className="nav-link">
              Kawasan Liputan
            </a>
            <a href="#servis" className="nav-link">
              Khidmat Hartanah
            </a>
            <a href="#kalkulator" className="nav-link">
              Semak Kelayakan
            </a>
            <a href="#soalan" className="nav-link">
              Soalan Lazim
            </a>
            <Link href="/login" className="nav-link">
              Agent Login
            </Link>
            <a href={whatsappUrl} className="btn btn--quiet btn--sm">
              WhatsApp Afif
            </a>
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Tutup" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav-drawer"
            className="nav-mobile-drawer"
            aria-label="Navigasi mudah alih"
          >
            <a href="#koridor" className="nav-link" onClick={() => setMenuOpen(false)}>
              Kawasan Liputan
            </a>
            <a href="#servis" className="nav-link" onClick={() => setMenuOpen(false)}>
              Khidmat Hartanah
            </a>
            <a href="#kalkulator" className="nav-link" onClick={() => setMenuOpen(false)}>
              Semak Kelayakan
            </a>
            <a href="#soalan" className="nav-link" onClick={() => setMenuOpen(false)}>
              Soalan Lazim
            </a>
            <Link href="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              Agent Login
            </Link>
            <a href={whatsappUrl} className="btn btn--primary">
              WhatsApp Afif
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
