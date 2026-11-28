import type { Metadata } from "next";
import Link from "next/link";
import { StudioNavbar } from "../../../components/StudioNavbar";
import { MastFooter } from "../../../components/MastFooter";
import { RevealObserver } from "../../../components/RevealObserver";
import { RentalYieldCalculator } from "../../../components/calculators/RentalYieldCalculator";
import { CalculatorNavCards } from "../../../components/CalculatorNavCards";
import { ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Rental Yield & Aliran Tunai Sewa Malaysia | NextProp4U",
  description:
    "Kira pulangan sewa kasar (Gross Rental Yield), pulangan sewa bersih (Net Rental Yield), dan baki aliran tunai bulanan selepas tolak instalment bank & kos penyelenggaraan.",
  keywords: [
    "kalkulator rental yield",
    "pulangan sewa rumah",
    "gross rental yield malaysia",
    "net rental yield formula",
    "aliran tunai beli rumah sewa",
    "pelaburan hartanah sewa",
    "ejen sewa rumah setapak kl",
  ],
  openGraph: {
    title: "Kalkulator Rental Yield & Aliran Tunai Sewa Malaysia | NextProp4U",
    description:
      "Kira peratusan pulangan pelaburan hartanah sewa anda secara tepat dengan mengambil kira fi penyelenggaraan dan cukai.",
    url: "https://nextprop4u.com/kalkulator/rental-yield",
    type: "website",
  },
};

export default function RentalYieldPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya ingin bertanyakan tentang analisis pulangan sewa (rental yield) dan unit pelaburan di KL / Selangor."
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
            <span className="text-[var(--color-ink)] font-medium">Rental Yield &amp; Aliran Tunai</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-10" data-reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Metrik Pelaburan Hartanah Komersial &amp; Kediaman
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
              Kalkulator Pulangan Sewa (Rental Yield &amp; Aliran Tunai)
            </h1>
            <p className="lead text-[var(--color-ink-2)] text-base sm:text-lg max-w-2xl">
              Kira nisbah pulangan sewa kasar (Gross) dan bersih (Net), serta ketahui sama ada hartanah anda menjana aliran tunai positif (untung bulanan) atau negatif selepas menampung komitmen pembiayaan bank.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="mb-16" data-reveal>
            <RentalYieldCalculator />
          </div>

          {/* Guide Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" data-reveal>
            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Beza Gross Rental Yield vs Net Rental Yield
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed">
                <div>
                  <strong className="text-[var(--color-ink)] block mb-1">
                    1. Gross Rental Yield (Pulangan Kasar):
                  </strong>
                  Formula: <code>(Sewa Bulanan Ã 12 Ã· Harga Beli Rumah) Ã 100</code>. Ini adalah ukuran pantas sebelum mengambil kira sebarang kos sampingan.
                </div>
                <div>
                  <strong className="text-[var(--color-ink)] block mb-1">
                    2. Net Rental Yield (Pulangan Bersih):
                  </strong>
                  Formula: <code>[(Sewa Kasar - Kos Penyelenggaraan - Cukai - Insurans - Cuti Sewa) Ã· Harga Beli] Ã 100</code>. Ini mencerminkan pulangan sebenar duit tunai yang masuk ke akaun pemilik.
                </div>
              </div>
            </div>

            <div className="sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
              <h2 className="font-display text-xl font-medium text-[var(--color-ink)] mb-4">
                Berapakah Rental Yield Yang Baik di Lembah Klang?
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink-2)] m-0 pl-0 list-none">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">&gt; 5.5% â 7.0%:</strong> Sangat cemerlang. Kategori ini lazimnya dicapai oleh kondominium berhampiran kampus universiti (contohnya TAR UMT di Setapak), stesen LRT, atau kawasan berketumpatan penyewa tinggi.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">4.0% â 5.0%:</strong> Purata pasaran kediaman standard di Kuala Lumpur dan Selangor. Menampung sebahagian besar atau keseluruhan ansuran pinjaman bank.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[var(--color-ink)]">&lt; 3.5%:</strong> Pulangan sewa rendah (lazimnya rumah teres mewah / banglo). Sasaran pelaburan jenis ini lebih tertumpu kepada kenaikan harga tanah (capital appreciation) berbanding sewaan tunai.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Interlinked Related Calculators */}
          <div data-reveal>
            <CalculatorNavCards currentSlug="/kalkulator/rental-yield" />
          </div>
        </div>
      </main>

      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
