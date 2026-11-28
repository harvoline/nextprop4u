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
  alternates: {
    canonical: "https://nextprop4u.com/kalkulator",
  },
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
    badge: "SRO 2023",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: FileText,
    iconColor: "text-blue-600",
    desc: "Kira anggaran duti setem pindah milik (MOT) mengikut skala bertingkat LHDN, fi peguam SPA berpandukan Solicitors' Remuneration Order (SRO 2023), duti setem loan, dan semak pengecualian rumah pertama.",
    highlights: [
      "Jadual kadar bertingkat MOT (1% - 4%)",
      "Skala fi guaman rasmi SRO 2023 (1.25% - 0.5%)",
      "Duti setem pinjaman 0.5% & anggaran disbursement",
      "Pengecualian 100% untuk Pembeli Rumah Pertama (< RM500k)",
    ],
  },
  {
    id: "rental-yield",
    title: "Kalkulator Pulangan Sewa (Rental Yield & Aliran Tunai)",
    shortTitle: "Rental Yield & Cash Flow",
    slug: "/kalkulator/rental-yield",
    badge: "Pelaburan Hartanah",
    badgeColor: "bg-amber-100 text-amber-800",
    icon: TrendingUp,
    iconColor: "text-amber-600",
    desc: "Kira Gross Rental Yield, Net Rental Yield, dan baki aliran tunai bersih bulanan selepas menolak yuran penyelenggaraan, cukai pintu/tanah, dan ansuran pinjaman bank.",
    highlights: [
      "Gross Rental Yield vs Net Rental Yield sebenar",
      "Tolak maintenance, sinking fund, cukai pintu & insurans",
      "Anggaran cuti sewa (vacancy buffer)",
      "Kiraan aliran tunai positif/negatif setiap bulan",
    ],
  },
  {
    id: "tenancy-agreement",
    title: "Kalkulator Duti Setem Perjanjian Sewa LHDN",
    shortTitle: "Stamping Tenancy LHDN",
    slug: "/kalkulator/tenancy-agreement",
    badge: "Rasmi LHDN",
    badgeColor: "bg-purple-100 text-purple-800",
    icon: Receipt,
    iconColor: "text-purple-600",
    desc: "Kira bayaran duti setem rasmi Lembaga Hasil Dalam Negeri (LHDN) untuk surat perjanjian sewa rumah bagi tempoh 1 tahun, 2 tahun, atau 3 tahun ke atas mengikut formula Akta Setem.",
    highlights: [
      "Formula rasmi LHDN (Pengecualian asas RM2,400)",
      "Kadar mengikut tempoh: RM1 / RM2 / RM4 per unit RM250",
      "Kiraan salinan pendua rasmi (RM10 per salinan)",
      "Anggaran caj draf perjanjian sewa profesional",
    ],
  },
];

export default function CalculatorIndexPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya ingin mendapatkan panduan dan semakan kiraan hartanah di KL / Selangor."
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
            <span className="text-[var(--color-ink)] font-medium">Kalkulator Hartanah</span>
          </nav>

          {/* Hero Header */}
          <div className="max-w-3xl mb-12" data-reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Alat Kewangan Hartanah Percuma 2026
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
            <p className="lead text-[var(--color-ink-2)] text-base sm:text-lg max-w-2xl">
              Alat pengiraan tepat untuk pembeli, penjual, pelabur dan pemilik hartanah di Setapak, Kuala Lumpur dan Selangor. Berpandukan garis panduan terkini Bank Negara Malaysia, LHDN, dan SRO 2023.
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" data-reveal>
            {CALCULATOR_DIRECTORY.map((item) => (
              <div
                key={item.id}
                className="sheet p-6 sm:p-8 flex flex-col justify-between border border-[var(--color-rule)]/70 hover:border-emerald-600/60 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-[var(--color-paper-2)] border border-[var(--color-rule)]/60 group-hover:scale-105 transition-transform">
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-medium text-[var(--color-ink)] group-hover:text-emerald-700 transition-colors mb-2">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-ink-2)] leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-[var(--color-muted)] pl-0 list-none">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[var(--color-rule)]/60">
                  <Link
                    href={item.slug}
                    className="btn btn--primary w-full text-center inline-flex items-center justify-center gap-2 text-xs py-2.5"
                  >
                    Buka Kalkulator {item.shortTitle}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Advisory Box */}
          <div className="p-6 sm:p-8 rounded-xl bg-[var(--color-paper-2)] border border-[var(--color-rule)] mb-16" data-reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block mb-1">
                  Konsultasi Percuma Tanpa Obligasi
                </span>
                <h3 className="text-lg sm:text-xl font-display text-[var(--color-ink)] m-0 font-medium">
                  Perlukan Semakan Rekod CCRIS / CTOS atau Nilai Pasaran JPPH?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-ink-2)] mt-2 mb-0 leading-relaxed">
                  Kiraan kalkulator memberi anggaran indikatif awal. Untuk semakan terperinci margin pinjaman bank sebenar dan nilai pasaran bank bagi hartanah anda di Setapak, KL &amp; Selangor, hubungi Muhammad Norafif secara terus.
                </p>
              </div>
              <a
                href={generalWhatsappUrl}
                className="btn btn--primary whitespace-nowrap self-stretch md:self-auto text-center text-xs py-3 px-6"
              >
                WhatsApp Konsultasi Percuma
              </a>
            </div>
          </div>
        </div>
      </main>

      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
