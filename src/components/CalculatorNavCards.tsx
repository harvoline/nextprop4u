import Link from "next/link";
import {
  Calculator,
  FileText,
  TrendingUp,
  Receipt,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export interface CalculatorItem {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  badge: string;
  desc: string;
  icon: "calculator" | "file-text" | "trending-up" | "receipt";
  color: string;
}

export const ALL_CALCULATORS: CalculatorItem[] = [
  {
    id: "pinjaman",
    title: "Kalkulator Pinjaman Perumahan & Kelayakan DSR",
    shortTitle: "Pinjaman & DSR",
    slug: "/kalkulator/pinjaman-perumahan",
    badge: "Asas Pembelian",
    desc: "Kira ansuran bulanan, had nisbah hutang (DSR 60%-70%), dan gaji minimum diperlukan mengikut kadar bank terkini.",
    icon: "calculator",
    color: "#16a34a",
  },
  {
    id: "duti-setem",
    title: "Kalkulator Duti Setem (MOT) & Kos Guaman SPA",
    shortTitle: "Duti Setem & Guaman",
    slug: "/kalkulator/duti-setem-legal-fee",
    badge: "LHDN & SRO 2023",
    desc: "Kira anggaran duti setem pindah milik (MOT), kos peguam SPA & pinjaman, serta semak syarat pengecualian rumah pertama.",
    icon: "file-text",
    color: "#2563eb",
  },
  {
    id: "rental-yield",
    title: "Kalkulator Pulangan Sewa (Rental Yield & Aliran Tunai)",
    shortTitle: "Rental Yield & Tunai",
    slug: "/kalkulator/rental-yield",
    badge: "Pelaburan Hartanah",
    desc: "Kira peratusan pulangan sewa kasar (Gross), pulangan bersih (Net), dan baki aliran tunai bulanan selepas tolak kos penyelenggaraan.",
    icon: "trending-up",
    color: "#d97706",
  },
  {
    id: "tenancy-agreement",
    title: "Kalkulator Duti Setem Perjanjian Sewa LHDN",
    shortTitle: "Tenancy Agreement LHDN",
    slug: "/kalkulator/tenancy-agreement",
    badge: "Formula Rasmi LHDN",
    desc: "Kira fi duti setem rasmi LHDN bagi tenancy agreement 1 tahun, 2 tahun, atau 3+ tahun serta salinan pendua.",
    icon: "receipt",
    color: "#9333ea",
  },
];

export function CalculatorNavCards({
  currentSlug,
  title = "Koleksi Kalkulator Hartanah Malaysia",
  subtitle = "Pilih kalkulator khusus di bawah untuk semakan tepat kos, kelayakan bank, atau pulangan pelaburan anda.",
}: {
  currentSlug?: string;
  title?: string;
  subtitle?: string;
}) {
  const filtered = currentSlug
    ? ALL_CALCULATORS.filter((c) => c.slug !== currentSlug)
    : ALL_CALCULATORS;

  return (
    <div className="mt-12 pt-8 border-t border-[var(--color-rule)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-muted)] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            ALAT SEMAKAN HARTANAH PERCUMA
          </div>
          <h3 className="text-xl font-display text-[var(--color-ink)] m-0">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-[var(--color-ink-2)] mt-1 m-0">
              {subtitle}
            </p>
          )}
        </div>
        {currentSlug && (
          <Link
            href="/kalkulator"
            className="text-xs font-medium text-[var(--color-ink)] hover:text-emerald-700 inline-flex items-center gap-1.5 whitespace-nowrap self-start sm:self-end pb-1"
          >
            Lihat Semua 4 Kalkulator
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={item.slug}
            className="group sheet p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-[var(--color-rule)] flex flex-col justify-between block"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-[var(--color-paper-2)] text-[var(--color-ink-2)]">
                  {item.badge}
                </span>
                <span className="text-xs text-[var(--color-muted)] group-hover:text-[var(--color-ink)] inline-flex items-center gap-1 transition-colors">
                  Buka Alat
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <h4 className="font-display text-base font-semibold text-[var(--color-ink)] group-hover:text-emerald-800 transition-colors m-0 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-[var(--color-ink-2)] mt-2 leading-relaxed m-0">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-rule)]/60 flex items-center justify-between text-xs text-[var(--color-muted)]">
              <span>Percuma &amp; Tanpa Daftar</span>
              <span className="font-medium text-[var(--color-ink)]">Kira Sekarang â</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
