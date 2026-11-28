import type { Metadata } from "next";
import Link from "next/link";
import { StudioNavbar } from "../../../components/StudioNavbar";
import { MastFooter } from "../../../components/MastFooter";
import { RevealObserver } from "../../../components/RevealObserver";
import { StampDutyLegalCalculator } from "../../../components/calculators/StampDutyLegalCalculator";
import { CalculatorNavCards } from "../../../components/CalculatorNavCards";
import { ShieldCheck, FileCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Duti Setem (MOT) & Kos Guaman SPA 2026 | NextProp4U",
  description:
    "Kira kos guaman beli rumah, duti setem MOT pindah milik (LHDN), kos peguam SPA mengikut SRO 2023, duti setem loan, serta pengecualian pembeli rumah pertama di Malaysia.",
  keywords: [
    "kalkulator duti setem",
    "kalkulator mot",
    "kos guaman beli rumah",
    "kalkulator legal fee malaysia",
    "duti setem rumah pertama",
    "spa legal fees sro 2023",
    "duti setem pinjaman perumahan",
  ],
  openGraph: {
    title: "Kalkulator Duti Setem (MOT) & Kos Guaman SPA 2026 | NextProp4U",
    description:
      "Kira anggaran duti setem pemilikan rumah dan fi peguam SPA secara tepat mengikut skala rasmi SRO 2023.",
    url: "https://nextprop4u.com/kalkulator/duti-setem-legal-fee",
    type: "website",
  },
};

export default function StampDutyLegalPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya ingin bertanyakan tentang anggaran kos guaman dan duti setem pembelian hartanah di KL / Selangor."
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
            <span className="text-[var(--color-ink)] font-medium">Duti Setem &amp; Kos Guaman</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-10" data-reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Skala Rasmi Solicitors&apos; Remuneration Order (SRO 2023) &amp; Akta Setem
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
              Kalkulator Duti Setem (MOT) &amp; Kos Guaman SPA
            </h1>
            <p className="lead text-[var(--color-ink-2)] text-base sm:text-lg max-w-2xl">
              Kira anggaran duti setem pemilikan (Memorandum of Transfer), kos guaman perjanjian jual beli (SPA), duti setem pinjaman perumahan, dan semak kelayakan pengecualian rumah pertama.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="mb-16" data-reveal>
            <StampDutyLegalCalculator />
          </div>

          {/* Legal Guide & Schedules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" data-reveal>
            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Jadual Kadar Bertingkat Duti Setem MOT (LHDN)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed mb-4">
                Duti setem bagi Surat Cara Pindah Milik (MOT / Deed of Assignment) dikira secara bertingkat mengikut harga belian hartanah dalam SPA:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-rule)] text-[var(--color-muted)]">
                      <th className="py-2 font-medium">Peringkat Nilai Hartanah</th>
                      <th className="py-2 font-medium text-right">Kadar Duti</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-rule)]/50 text-[var(--color-ink-2)]">
                    <tr>
                      <td className="py-2">RM100,000 Pertama</td>
                      <td className="py-2 text-right font-medium">1.0% (Maks RM1,000)</td>
                    </tr>
                    <tr>
                      <td className="py-2">RM100,001 hingga RM500,000</td>
                      <td className="py-2 text-right font-medium">2.0% (Maks RM8,000)</td>
                    </tr>
                    <tr>
                      <td className="py-2">RM500,001 hingga RM1,000,000</td>
                      <td className="py-2 text-right font-medium">3.0% (Maks RM15,000)</td>
                    </tr>
                    <tr>
                      <td className="py-2">Melebihi RM1,000,000</td>
                      <td className="py-2 text-right font-medium">4.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-[var(--color-muted)] mt-3 leading-relaxed m-0">
                * Pembeli rumah pertama berhak menikmati pengecualian 100% duti setem untuk hartanah berharga RM500,000 ke bawah.
              </p>
            </div>

            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Skala Fi Peguam Hartanah (SRO 2023)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed mb-4">
                Fi guaman bagi penyediaan Perjanjian Jual Beli (SPA) dan Perjanjian Pinjaman dikawal selia di bawah <em>Solicitors&apos; Remuneration Order (SRO 2023)</em>:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-rule)] text-[var(--color-muted)]">
                      <th className="py-2 font-medium">Peringkat Nilai SPA / Pinjaman</th>
                      <th className="py-2 font-medium text-right">Skala Fi Rasmi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-rule)]/50 text-[var(--color-ink-2)]">
                    <tr>
                      <td className="py-2">RM500,000 Pertama</td>
                      <td className="py-2 text-right font-medium">1.25% (Min RM500)</td>
                    </tr>
                    <tr>
                      <td className="py-2">RM500,001 hingga RM1,000,000</td>
                      <td className="py-2 text-right font-medium">1.00%</td>
                    </tr>
                    <tr>
                      <td className="py-2">RM1,000,001 hingga RM3,000,000</td>
                      <td className="py-2 text-right font-medium">0.75%</td>
                    </tr>
                    <tr>
                      <td className="py-2">RM3,000,001 hingga RM5,000,000</td>
                      <td className="py-2 text-right font-medium">0.60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-[var(--color-muted)] mt-3 leading-relaxed m-0">
                * Tertakluk kepada Cukai Perkhidmatan (SST 8%) ke atas fi guaman dan kos disbursement pejabat tanah.
              </p>
            </div>
          </div>

          {/* Interlinked Related Calculators */}
          <div data-reveal>
            <CalculatorNavCards currentSlug="/kalkulator/duti-setem-legal-fee" />
          </div>
        </div>
      </main>

      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
