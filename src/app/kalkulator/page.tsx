import type { Metadata } from "next";
import Link from "next/link";
import { StudioNavbar } from "../../components/StudioNavbar";
import { MastFooter } from "../../components/MastFooter";
import { RevealObserver } from "../../components/RevealObserver";
import {
  Calculator,
  FileText,
  TrendingUp,
  Receipt,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Percent,
  Clock,
  Building,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kalkulator Hartanah Malaysia 2026 | NextProp4U - Muhammad Norafif",
  description:
    "Koleksi kalkulator hartanah percuma Malaysia: Semak kelayakan pinjaman rumah & DSR, duti setem (MOT), kos guaman SPA (SRO 2023), rental yield, dan duti setem tenancy agreement LHDN.",
  keywords: [
    "kalkulator hartanah",
    "kalkulator pinjaman perumahan",
    "kalkulator duti setem",
    "kalkulator mot",
    "kos guaman beli rumah",
    "kalkulator rental yield",
    "kalkulator tenancy agreement lhdn",
    "dsr calculator malaysia",
    "ejen hartanah setapak",
    "nextprop4u",
  ],
  openGraph: {
    title: "Kalkulator Hartanah Malaysia 2026 | NextProp4U",
    description:
      "Kira ansuran pinjaman perumahan, duti setem MOT, kos guaman SPA, pulangan sewa, dan duti setem LHDN secara percuma.",
    url: "https://nextprop4u.com/kalkulator",
    type: "website",
  },
};

const CALCULATOR_DIRECTORY = [
  {
    id: "pinjaman-perumahan",
    title: "Kalkulator Pinjaman Perumahan & Kelayakan DSR",
    shortTitle: "Pinjaman & DSR",
    slug: "/kalkulator/pinjaman-perumahan",
    badge: "Paling Popular",
    badgeColor: "bg-emerald-100 text-emerald-800",
    icon: Calculator,
    iconColor: "text-emerald-600",
    desc: "Kira ansuran bulanan bank, nisbah had komitmen hutang (DSR 60%-70%), anggaran faedah, dan gaji bersih minimum yang diperlukan bagi membeli rumah di Setapak, KL & Selangor.",
    highlights: [
      "Kiraan ansuran bulanan ikut harga & tempoh pinjaman",
      "Semakan had Debt Service Ratio (DSR 60% / 70%)",
      "Anggaran gaji bersih minimum pembeli",
      "Penilaian indikatif panel bank Malaysia",
    ],
  },
  {
    id: "duti-setem-legal-fee",
    title: "Kalkulator Duti Setem (MOT) & Kos Guaman SPA",
    shortTitle: "Duti Setem & Guaman",
    slug: "/kalkulator/duti-setem-legal-fee",
    badge: "LHDN & SRO 2023",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: FileText,
    iconColor: "text-blue-600",
    desc: "Kira kos keseluruhan kemasukan beli rumah: Duti setem surat cara pindah milik (MOT), kos guaman SPA mengikut SRO 2023, duti setem pinjaman bank, dan semakan pengecualian pembeli rumah pertama.",
    highlights: [
      "Kadar bertingkat MOT LHDN terkini (1% hingga 4%)",
      "Skala rasmi fi peguam SRO 2023",
      "Semakan pengecualian 100% duti setem rumah pertama",
      "Ringkasan anggaran tunai deposit & kos guaman",
    ],
  },
  {
    id: "rental-yield",
    title: "Kalkulator Pulangan Sewa (Rental Yield & Aliran Tunai)",
    shortTitle: "Rental Yield & Tunai",
    slug: "/kalkulator/rental-yield",
    badge: "Pelaburan Hartanah",
    badgeColor: "bg-amber-100 text-amber-800",
    icon: TrendingUp,
    iconColor: "text-amber-600",
    desc: "Kira kadar pulangan sewa kasar (Gross Rental Yield) dan pulangan sewa bersih (Net Rental Yield) selepas ditolak caj penyelenggaraan, sinking fund, cukai pintu, cukai tanah & insurans.",
    highlights: [
      "Kiraan Gross vs Net Rental Yield",
      "Analisis baki aliran tunai bulanan bersih (Cashflow)",
      "Tolak fi maintenance, cukai taksiran & perbelanjaan",
      "Indikator kelayakan pelaburan hartanah sewa",
    ],
  },
  {
    id: "tenancy-agreement",
    title: "Kalkulator Duti Setem Perjanjian Sewa Rumah LHDN",
    shortTitle: "Tenancy Agreement LHDN",
    slug: "/kalkulator/tenancy-agreement",
    badge: "Formula Rasmi LHDN",
    badgeColor: "bg-purple-100 text-purple-800",
    icon: Receipt,
    iconColor: "text-purple-600",
    desc: "Kira caj duti setem rasmi LHDN bagi mematikan setem perjanjian sewa rumah (Tenancy Agreement) untuk tempoh 1 tahun, 2 tahun, atau 3+ tahun termasuk bayaran salinan pendua.",
    highlights: [
      "Pengecualian asas RM2,400 pertama sewaan setahun",
      "Kadar tepat RM1 / RM2 / RM4 bagi setiap RM250",
      "Kiraan kos salinan pendua (RM10 per salinan)",
      "Anggaran caj guaman / pengurusan perjanjian sewa",
    ],
  },
];

export default function CalculatorHubPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya ingin bertanyakan tentang kiraan kos hartanah dan semakan kelayakan pinjaman di KL / Selangor."
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
            <span className="text-[var(--color-ink)] font-medium">Koleksi Kalkulator Hartanah</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-12" data-reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Alat Semakan Kewangan &amp; Perundangan Hartanah 2026
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
              Koleksi Kalkulator Hartanah Malaysia
            </h1>
            <p className="lead text-[var(--color-ink-2)] max-w-2xl text-base sm:text-lg">
              Kira anggaran kos pembelian, duti setem MOT, kelayakan pinjaman bank, pulangan sewa (rental yield), serta perjanjian sewa rumah secara tepat dan percuma.
            </p>
          </div>

          {/* 4 Large Interactive Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {CALCULATOR_DIRECTORY.map((calc, idx) => {
              const Icon = calc.icon;
              return (
                <div
                  key={calc.id}
                  className="sheet p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-[var(--color-rule)]/60"
                  data-reveal
                  style={{ "--i": idx } as React.CSSProperties}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-paper-2)] flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${calc.iconColor}`} />
                      </div>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded ${calc.badgeColor}`}>
                        {calc.badge}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-medium text-[var(--color-ink)] mb-3 leading-snug">
                      {calc.title}
                    </h2>
                    <p className="text-sm text-[var(--color-ink-2)] leading-relaxed mb-6">
                      {calc.desc}
                    </p>

                    <div className="space-y-2 mb-8 bg-[var(--color-paper-2)]/60 p-4 rounded-md">
                      <span className="text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-2">
                        Ciri &amp; Kandungan Kiraan:
                      </span>
                      {calc.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-ink-2)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-rule)]/60 flex items-center justify-between">
                    <span className="text-xs text-[var(--color-muted)] font-medium">
                      Percuma â¢ Tanpa Log Masuk
                    </span>
                    <Link
                      href={calc.slug}
                      className="btn btn--primary btn--sm inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      Buka Kalkulator
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advisory & Maxxan Trust Bar */}
          <div className="sheet p-6 sm:p-8 bg-gradient-to-br from-[var(--color-paper-hi)] to-[var(--color-paper-2)] border border-[var(--color-rule)]" data-reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block mb-1">
                  Konsultasi Peribadi Bersama Ejen Berdaftar
                </span>
                <h3 className="text-xl font-display text-[var(--color-ink)] font-medium m-0">
                  Perlukan Semakan Dokumen atau Penilaian Pasaran JPPH?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-ink-2)] mt-2 m-0 leading-relaxed">
                  Kalkulator memberikan anggaran awal. Untuk semakan kelayakan pinjaman menyeluruh (CCRIS, CTOS &amp; DSR bank) serta khidmat jual-beli di Setapak, KL &amp; Selangor, hubungi Muhammad Norafif secara terus.
                </p>
              </div>
              <a
                href={generalWhatsappUrl}
                className="btn btn--primary whitespace-nowrap inline-flex items-center justify-center gap-2 self-stretch md:self-auto"
              >
                Konsultasi Melalui WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
