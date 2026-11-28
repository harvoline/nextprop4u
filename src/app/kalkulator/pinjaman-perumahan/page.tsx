import type { Metadata } from "next";
import Link from "next/link";
import { StudioNavbar } from "../../../components/StudioNavbar";
import { MastFooter } from "../../../components/MastFooter";
import { RevealObserver } from "../../../components/RevealObserver";
import { MortgageDsrCalculator } from "../../../components/calculators/MortgageDsrCalculator";
import { CalculatorNavCards } from "../../../components/CalculatorNavCards";
import { ShieldCheck, HelpCircle, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Pinjaman Perumahan & DSR Malaysia 2026 | NextProp4U",
  description:
    "Kira ansuran bulanan pinjaman rumah, had Debt Service Ratio (DSR 60%-70%), anggaran faedah bank terkini, dan gaji minimum beli rumah di KL & Selangor.",
  keywords: [
    "kalkulator pinjaman perumahan",
    "dsr calculator malaysia",
    "kira ansuran bulanan rumah",
    "housing loan calculator malaysia",
    "kelayakan beli rumah",
    "gaji minimum beli rumah",
    "pinjaman bank perumahan",
  ],
  openGraph: {
    title: "Kalkulator Pinjaman Perumahan & DSR Malaysia 2026 | NextProp4U",
    description:
      "Kira ansuran bulanan pinjaman rumah dan semak had kelayakan DSR bank secara percuma bersama perunding hartanah berdaftar.",
    url: "https://nextprop4u.com/kalkulator/pinjaman-perumahan",
    type: "website",
  },
};

export default function MortgageDsrPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya ingin bertanyakan tentang kelayakan pinjaman perumahan dan had DSR saya di KL / Selangor."
  )}`;

  return (
    <div id="top">
      <RevealObserver />
      <StudioNavbar whatsappUrl={generalWhatsappUrl} />

      <main id="main" className="studio-section--paper studio-section min-h-screen">
        <div className="container pt-8 md:pt-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--color-muted)] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink)] transition-colors">
              Laman Utama
            </Link>
            <span>/</span>
            <Link href="/kalkulator" className="hover:text-[var(--color-ink)] transition-colors">
              Kalkulator
            </Link>
            <span>/</span>
            <span className="text-[var(--color-ink)] font-medium">Pinjaman &amp; DSR</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-10" data-reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Formula Bank Negara Malaysia &amp; Panel Bank Utama
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-s)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-display)",
                color: "var(--color-ink)",
                fontWeight: 400,
              }}
              className="mb-4"
            >
              Kalkulator Pinjaman Perumahan &amp; Kelayakan DSR
            </h1>
            <p className="lead text-[var(--color-ink-2)] text-base sm:text-lg max-w-2xl">
              Kira anggaran ansuran bulanan, semak nisbah hutang (DSR), dan ketahui anggaran gaji bersih yang diperlukan sebelum memohon pinjaman rumah di Setapak, KL &amp; Selangor.
            </p>
          </div>

          {/* Interactive Calculator Workbench */}
          <div className="mb-16" data-reveal>
            <MortgageDsrCalculator />
          </div>

          {/* Educational Guide & Formula Section for SEO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" data-reveal>
            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Apakah Itu Debt Service Ratio (DSR)?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed mb-4">
                <strong>Debt Service Ratio (DSR)</strong> ialah formula utama yang digunakan oleh semua bank di Malaysia (seperti Maybank, CIMB, RHB, Public Bank, dan Bank Islam) untuk menilai kemampuan peminjam membayar balik pinjaman setiap bulan.
              </p>
              <div className="p-4 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)]/80 text-xs font-mono text-[var(--color-ink)] mb-4">
                DSR (%) = [(Jumlah Komitmen Hutang Bulanan + Ansuran Rumah Baru) Ã· Pendapatan Bersih Bulanan] Ã 100
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed m-0">
                * Komitmen hutang merangkumi ansuran kereta, kad kredit (5% baki terkumpul), pinjaman peribadi, dan PTPTN yang direkodkan dalam laporan CCRIS Bank Negara Malaysia.
              </p>
            </div>

            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Berapa Had DSR Yang Bank Benarkan?
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink-2)] m-0 pl-0 list-none">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">Gaji Bersih Bawah RM3,000:</strong> Kebanyakan bank menetapkan had DSR maksimum antara <strong>50% hingga 60%</strong>.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">Gaji Bersih RM3,000 â RM5,000:</strong> Had DSR diterima lazimnya antara <strong>60% hingga 70%</strong>.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">Gaji Bersih RM5,000 ke Atas:</strong> Bank tertentu boleh mempertimbangkan had DSR sehingga <strong>75% â 80%</strong> bergantung pada profil kerjaya dan simpanan kecairan.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Interlinked Related Calculators */}
          <div data-reveal>
            <CalculatorNavCards currentSlug="/kalkulator/pinjaman-perumahan" />
          </div>
        </div>
      </main>

      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
