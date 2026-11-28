import type { Metadata } from "next";
import Link from "next/link";
import { StudioNavbar } from "../../../components/StudioNavbar";
import { MastFooter } from "../../../components/MastFooter";
import { RevealObserver } from "../../../components/RevealObserver";
import { TenancyStampingCalculator } from "../../../components/calculators/TenancyStampingCalculator";
import { CalculatorNavCards } from "../../../components/CalculatorNavCards";
import { ShieldCheck, Receipt, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Duti Setem Perjanjian Sewa LHDN 2026 | NextProp4U",
  description:
    "Kira duti setem perjanjian sewa rumah (Tenancy Agreement) mengikut formula rasmi Lembaga Hasil Dalam Negeri (LHDN) untuk tempoh 1 tahun, 2 tahun, atau 3 tahun ke atas.",
  keywords: [
    "kalkulator tenancy agreement lhdn",
    "duti setem sewa rumah",
    "kira stamping tenancy agreement",
    "kos tenancy agreement malaysia",
    "formula duti setem sewa lhdn",
    "stamping perjanjian sewa",
    "tenancy agreement stamping fee",
  ],
  openGraph: {
    title: "Kalkulator Duti Setem Perjanjian Sewa LHDN 2026 | NextProp4U",
    description:
      "Kira kos duti setem rasmi LHDN dan salinan pendua perjanjian sewa rumah secara pantas dan tepat.",
    url: "https://nextprop4u.com/kalkulator/tenancy-agreement",
    type: "website",
  },
};

export default function TenancyAgreementPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya ingin bertanyakan tentang penyediaan dan stamping perjanjian sewa (Tenancy Agreement) di KL / Selangor."
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
            <span className="text-[var(--color-ink)] font-medium">Tenancy Agreement LHDN</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-10" data-reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-purple-700 bg-purple-50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Formula Rasmi Akta Setem 1949 &amp; Lembaga Hasil Dalam Negeri (LHDN)
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
              Kalkulator Duti Setem Perjanjian Sewa LHDN
            </h1>
            <p className="lead text-[var(--color-ink-2)] text-base sm:text-lg max-w-2xl">
              Kira anggaran bayaran duti setem untuk mematikan setem surat perjanjian sewa rumah (Tenancy Agreement) secara sah di LHDN mengikut kadar tempoh 1 tahun, 2 tahun, atau lebih.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="mb-16" data-reveal>
            <TenancyStampingCalculator />
          </div>

          {/* Educational Formula Guide for SEO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" data-reveal>
            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Formula Rasmi Duti Setem Sewa LHDN
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed mb-4">
                Mengikut Akta Setem Malaysia, formula pengiraan duti setem bagi perjanjian sewa kediaman adalah seperti berikut:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)]/70">
                  <strong className="text-[var(--color-ink)] block mb-1">Langkah 1: Kira Sewa Setahun</strong>
                  <code>Jumlah Sewa Setahun = Sewa Bulanan Ã 12</code>
                </div>
                <div className="p-3 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)]/70">
                  <strong className="text-[var(--color-ink)] block mb-1">Langkah 2: Tolak Pengecualian Asas RM2,400</strong>
                  <code>Baki Kena Cukai = Jumlah Sewa Setahun - RM2,400</code>
                </div>
                <div className="p-3 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)]/70">
                  <strong className="text-[var(--color-ink)] block mb-1">Langkah 3: Bahagi Dengan RM250 (Bundar ke Atas)</strong>
                  <code>Unit RM250 = Math.ceil(Baki Kena Cukai Ã· 250)</code>
                </div>
                <div className="p-3 rounded bg-[var(--color-paper-2)] border border-[var(--color-rule)]/70">
                  <strong className="text-[var(--color-ink)] block mb-1">Langkah 4: Darab Kadar Tempoh</strong>
                  <ul className="list-disc pl-4 space-y-1 mt-1 text-[var(--color-ink-2)]">
                    <li><strong>1 tahun atau kurang:</strong> Unit RM250 Ã RM1</li>
                    <li><strong>1 hingga 3 tahun (cth. 2 tahun):</strong> Unit RM250 Ã RM2</li>
                    <li><strong>Melebihi 3 tahun:</strong> Unit RM250 Ã RM4</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Mengapa Perlu Matikan Setem di LHDN?
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink-2)] m-0 pl-0 list-none">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">Boleh Diterima di Mahkamah:</strong> Di bawah Seksyen 52 Akta Setem 1949, dokumen perjanjian yang tidak disetemkan tidak boleh diterima sebagai bahan bukti sah di mahkamah sekiranya berlaku pertikaian atau tunggakan sewa.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">Perlindungan Hak Tuan Rumah &amp; Penyewa:</strong> Memastikan klausa deposit, pemulangan kunci, pembaikan kerosakan, dan syarat notis tamat sewa terikat secara undang-undang rasmi.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">Sijil Setem Digital (STAMPS):</strong> Duti setem kini dibayar secara dalam talian melalui portal STAMPS LHDN dengan sijil rasmi yang disertakan kod QR pengesahan ketulenan.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Interlinked Related Calculators */}
          <div data-reveal>
            <CalculatorNavCards currentSlug="/kalkulator/tenancy-agreement" />
          </div>
        </div>
      </main>

      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
