"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import {
  Calculator,
  FileText,
  TrendingUp,
  Receipt,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface StudioNavbarProps {
  whatsappUrl: string;
}

const CALCULATORS = [
  {
    name: "Pinjaman & Kelayakan DSR",
    desc: "Ansuran bulanan & kelayakan gaji bank",
    href: "/kalkulator/pinjaman-perumahan",
    badge: "Popular",
    icon: Calculator,
    iconColor: "text-emerald-700",
    bgIcon: "bg-emerald-50",
  },
  {
    name: "Duti Setem (MOT) & Guaman SPA",
    desc: "Kiraan MOT LHDN & fi peguam SRO 2023",
    href: "/kalkulator/duti-setem-legal-fee",
    badge: "MOT",
    icon: FileText,
    iconColor: "text-blue-700",
    bgIcon: "bg-blue-50",
  },
  {
    name: "Rental Yield & Aliran Tunai",
    desc: "Pulangan sewa kasar, bersih & cash flow",
    href: "/kalkulator/rental-yield",
    badge: "Pelaburan",
    icon: TrendingUp,
    iconColor: "text-amber-700",
    bgIcon: "bg-amber-50",
  },
  {
    name: "Duti Setem Tenancy LHDN",
    desc: "Stamping rasmi perjanjian sewa rumah",
    href: "/kalkulator/tenancy-agreement",
    badge: "LHDN",
    icon: Receipt,
    iconColor: "text-purple-700",
    bgIcon: "bg-purple-50",
  },
];

export function StudioNavbar({ whatsappUrl }: { whatsappUrl: string }) {
  const [retracted, setRetracted] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCalcDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCalcDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCalcDropdownOpen(false);
    }, 150);
  };

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
            Maxxan Realty:
            <span className="banner-extended">
              {" "}Perunding Hartanah Setapak, KL (Liputan Kuala Lumpur &amp; Selangor)
            </span>
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
            <Link href="/#koridor" className="nav-link">
              Kawasan Liputan
            </Link>
            <Link href="/#servis" className="nav-link">
              Khidmat Hartanah
            </Link>

            {/* Direct Calculator Dropdown Menu */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`nav-link inline-flex items-center gap-1.5 cursor-pointer bg-transparent border-0 font-medium py-2 ${
                  calcDropdownOpen ? "text-[var(--color-ink)]" : ""
                }`}
                onClick={() => setCalcDropdownOpen((v) => !v)}
                aria-expanded={calcDropdownOpen}
                aria-haspopup="true"
              >
                <span>Kalkulator</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded tracking-wide">
                  4 Alat
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-[var(--color-muted)] ${
                    calcDropdownOpen ? "rotate-180 text-[var(--color-ink)]" : ""
                  }`}
                />
              </button>

              {/* High visibility dropdown card */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-84 p-2 bg-[var(--color-paper-hi)] rounded-xl shadow-xl border border-[var(--color-rule)] transition-all duration-150 z-50 ${
                  calcDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                }`}
                style={{
                  boxShadow:
                    "0 12px 28px -4px rgba(0,0,0,0.12), 0 4px 12px -2px rgba(0,0,0,0.06)",
                }}
              >
                <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-rule)]/60 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Kalkulator Percuma
                  </span>
                  <span className="text-[10px] text-[var(--color-muted)]">
                    Khas KL &amp; Selangor
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  {CALCULATORS.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="p-2.5 rounded-lg hover:bg-[var(--color-paper-3)] transition-all group flex items-start gap-3 text-left"
                      onClick={() => setCalcDropdownOpen(false)}
                    >
                      <div
                        className={`p-2 rounded-lg ${calc.bgIcon} border border-[var(--color-rule)]/60 mt-0.5 group-hover:scale-105 transition-transform`}
                      >
                        <calc.icon className={`w-4 h-4 ${calc.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-[var(--color-ink)] group-hover:text-emerald-800 transition-colors">
                            {calc.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--color-muted)] m-0 leading-tight mt-0.5 truncate">
                          {calc.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-1 pt-1.5 border-t border-[var(--color-rule)]/60 px-2 py-1 flex items-center justify-between text-[11px]">
                  <Link
                    href="/kalkulator"
                    className="text-[var(--color-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 font-medium transition-colors"
                    onClick={() => setCalcDropdownOpen(false)}
                  >
                    <span>Lihat direktori semua kalkulator</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/#soalan" className="nav-link">
              Soalan Lazim
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

        {/* Mobile drawer with prominent direct calculator menu */}
        {menuOpen && (
          <nav
            id="mobile-nav-drawer"
            className="nav-mobile-drawer"
            aria-label="Navigasi mudah alih"
          >
            <Link
              href="/#koridor"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Kawasan Liputan
            </Link>
            <Link
              href="/#servis"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Khidmat Hartanah
            </Link>

            {/* Direct mobile calculator links - No need to go to directory first! */}
            <div className="my-2 p-3 rounded-xl bg-[var(--color-paper)] border border-[var(--color-rule)]">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[var(--color-rule)]/60">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  Pilih Kalkulator Hartanah
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                  4 Alat
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {CALCULATORS.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="p-2.5 rounded-lg bg-[var(--color-paper-hi)] border border-[var(--color-rule)]/60 hover:bg-[var(--color-paper-3)] transition-colors flex items-center gap-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className={`p-1.5 rounded ${calc.bgIcon} ${calc.iconColor}`}>
                      <calc.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[var(--color-ink)]">
                        {calc.name}
                      </div>
                      <div className="text-[11px] text-[var(--color-muted)] truncate">
                        {calc.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#soalan"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Soalan Lazim
            </Link>
            <a href={whatsappUrl} className="btn btn--primary mt-1">
              WhatsApp Afif
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
