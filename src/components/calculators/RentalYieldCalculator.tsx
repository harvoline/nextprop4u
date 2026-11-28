"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Coins,
  Building,
  PieChart,
  DollarSign,
} from "lucide-react";

const WHATSAPP_NUMBER = "601158683907";

function formatRm(val: number) {
  return `RM ${Math.round(val).toLocaleString("en-MY")}`;
}

function parseNum(raw: string): number {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const p = parseFloat(cleaned);
  return Number.isFinite(p) ? p : 0;
}

export function RentalYieldCalculator() {
  const [priceText, setPriceText] = useState("380000");
  const [rentText, setRentText] = useState("1800");
  const [installmentText, setInstallmentText] = useState("1450");
  const [maintenanceText, setMaintenanceText] = useState("200");
  const [annualTaxText, setAnnualTaxText] = useState("650"); // Cukai pintu + cukai tanah
  const [annualInsuranceText, setAnnualInsuranceText] = useState("220");
  const [vacancyMonths, setVacancyMonths] = useState(1); // 1 month estimated vacancy/repairs per year

  const calc = useMemo(() => {
    const price = parseNum(priceText);
    const rent = parseNum(rentText);
    const installment = parseNum(installmentText);
    const maintenanceMonthly = parseNum(maintenanceText);
    const annualTax = parseNum(annualTaxText);
    const annualInsurance = parseNum(annualInsuranceText);

    // 1. Gross Rental
    const annualGrossRent = rent * 12;
    const grossYield = price > 0 ? (annualGrossRent / price) * 100 : 0;

    // 2. Annual Operating Expenses
    const annualMaintenance = maintenanceMonthly * 12;
    const annualVacancyLoss = rent * vacancyMonths;
    const totalOperatingExpenses = annualMaintenance + annualTax + annualInsurance + annualVacancyLoss;

    // 3. Net Rental
    const annualNetRent = Math.max(0, annualGrossRent - totalOperatingExpenses);
    const netYield = price > 0 ? (annualNetRent / price) * 100 : 0;

    // 4. Monthly Cashflow (after financing)
    const monthlyOutflow = installment + maintenanceMonthly + (annualTax + annualInsurance) / 12;
    const monthlyNetCashflow = rent - monthlyOutflow;
    const annualNetCashflow = monthlyNetCashflow * 12;

    // Investment rating
    let rating: "cemerlang" | "baik" | "sederhana" = "baik";
    if (grossYield >= 6.0) {
      rating = "cemerlang";
    } else if (grossYield >= 4.5) {
      rating = "baik";
    } else {
      rating = "sederhana";
    }

    return {
      price,
      rent,
      installment,
      maintenanceMonthly,
      annualGrossRent,
      grossYield,
      totalOperatingExpenses,
      annualNetRent,
      netYield,
      monthlyNetCashflow,
      annualNetCashflow,
      monthlyOutflow,
      rating,
    };
  }, [
    priceText,
    rentText,
    installmentText,
    maintenanceText,
    annualTaxText,
    annualInsuranceText,
    vacancyMonths,
  ]);

  const whatsappHref = useMemo(() => {
    const msg = `Hai Afif, saya membuat semakan Rental Yield di NextProp4U:\n- Nilai Unit: ${formatRm(calc.price)}\n- Kadar Sewa Bulanan: ${formatRm(calc.rent)}\n- Gross Rental Yield: ${calc.grossYield.toFixed(2)}%\n- Net Rental Yield: ${calc.netYield.toFixed(2)}%\n- Aliran Tunai Bersih: ${formatRm(calc.monthlyNetCashflow)} / bln\nBoleh bantu cadangkan projek hartanah berpenyewa tinggi di Setapak / KL / Selangor?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [calc]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-5 sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-rule)]/60">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg font-display text-[var(--color-ink)] m-0 font-medium">
            Data Sewaan &amp; Kos Unit
          </h2>
        </div>

        <div className="space-y-4">
          {/* Harga Beli Hartanah */}
          <div className="field-group">
            <label htmlFor="input-yield-price" className="field-label flex justify-between">
              <span>Harga Pembelian Hartanah (RM)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                {formatRm(calc.price)}
              </span>
            </label>
            <input
              id="input-yield-price"
              type="text"
              inputMode="numeric"
              value={priceText}
              onChange={(e) => setPriceText(e.target.value.replace(/[^\d]/g, ""))}
              className="studio-input tabular-nums font-medium"
              placeholder="380000"
            />
          </div>

          {/* Sewa Bulanan */}
          <div className="field-group">
            <label htmlFor="input-yield-rent" className="field-label flex justify-between">
              <span>Kadar Sewa Bulanan (RM)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                Sewa Tahunan: {formatRm(calc.annualGrossRent)}
              </span>
            </label>
            <input
              id="input-yield-rent"
              type="text"
              inputMode="numeric"
              value={rentText}
              onChange={(e) => setRentText(e.target.value.replace(/[^\d]/g, ""))}
              className="studio-input tabular-nums font-medium text-emerald-800"
              placeholder="1800"
            />
          </div>

          {/* Ansuran Bulanan Bank */}
          <div className="field-group">
            <label htmlFor="input-yield-loan" className="field-label">
              Ansuran Pinjaman Bank Bulanan (RM)
            </label>
            <input
              id="input-yield-loan"
              type="text"
              inputMode="numeric"
              value={installmentText}
              onChange={(e) => setInstallmentText(e.target.value.replace(/[^\d]/g, ""))}
              className="studio-input tabular-nums"
              placeholder="1450"
            />
          </div>

          {/* Maintenance & Sinking Fund */}
          <div className="grid grid-cols-2 gap-3">
            <div className="field-group">
              <label htmlFor="input-yield-maint" className="field-label">
                Maintenance / Bln
              </label>
              <input
                id="input-yield-maint"
                type="text"
                inputMode="numeric"
                value={maintenanceText}
                onChange={(e) => setMaintenanceText(e.target.value.replace(/[^\d]/g, ""))}
                className="studio-input tabular-nums"
                placeholder="200"
              />
            </div>

            <div className="field-group">
              <label htmlFor="input-yield-vacancy" className="field-label">
                Cuti Sewa (Bulan/Thn)
              </label>
              <select
                id="input-yield-vacancy"
                value={vacancyMonths}
                onChange={(e) => setVacancyMonths(Number(e.target.value))}
                className="studio-input"
              >
                <option value={0}>0 bulan (Penyewa berterusan)</option>
                <option value={0.5}>0.5 bulan (2 minggu kosong)</option>
                <option value={1}>1 bulan (Standard pasaran)</option>
                <option value={2}>2 bulan (Kawasan kompetitif)</option>
              </select>
            </div>
          </div>

          {/* Cukai Pintu & Insurans Tahunan */}
          <div className="grid grid-cols-2 gap-3">
            <div className="field-group">
              <label htmlFor="input-yield-tax" className="field-label">
                Cukai Pintu &amp; Tanah / Thn
              </label>
              <input
                id="input-yield-tax"
                type="text"
                inputMode="numeric"
                value={annualTaxText}
                onChange={(e) => setAnnualTaxText(e.target.value.replace(/[^\d]/g, ""))}
                className="studio-input tabular-nums"
                placeholder="650"
              />
            </div>

            <div className="field-group">
              <label htmlFor="input-yield-ins" className="field-label">
                Insurans Kebakaran / Thn
              </label>
              <input
                id="input-yield-ins"
                type="text"
                inputMode="numeric"
                value={annualInsuranceText}
                onChange={(e) => setAnnualInsuranceText(e.target.value.replace(/[^\d]/g, ""))}
                className="studio-input tabular-nums"
                placeholder="220"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Output Readout */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
        <div className="sheet p-6 sm:p-8 bg-[var(--color-paper-hi)] border border-[var(--color-rule)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Peratusan Pulangan Sewa Hartanah
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-[var(--color-paper-2)] border border-[var(--color-rule)]/60">
              <span className="text-xs text-[var(--color-muted)] block font-medium">
                Gross Rental Yield (Kasar)
              </span>
              <div className="text-3xl font-display font-medium text-amber-700 tabular-nums mt-1">
                {calc.grossYield.toFixed(2)}%
              </div>
              <p className="text-[11px] text-[var(--color-ink-2)] mt-1 m-0">
                Nisbah sewa tahunan atas harga belian
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--color-paper-2)] border border-[var(--color-rule)]/60">
              <span className="text-xs text-[var(--color-muted)] block font-medium">
                Net Rental Yield (Bersih)
              </span>
              <div className="text-3xl font-display font-medium text-emerald-700 tabular-nums mt-1">
                {calc.netYield.toFixed(2)}%
              </div>
              <p className="text-[11px] text-[var(--color-ink-2)] mt-1 m-0">
                Selepas tolak fi maintenance, cukai &amp; kos operasi
              </p>
            </div>
          </div>

          {/* Monthly Cashflow Highlight */}
          <div
            className={`p-4 rounded-md mb-6 border ${
              calc.monthlyNetCashflow >= 0
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-rose-50 border-rose-200 text-rose-900"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider block opacity-80">
                  Baki Aliran Tunai Bulanan (Net Cashflow)
                </span>
                <div className="text-2xl font-display font-semibold tabular-nums mt-0.5">
                  {calc.monthlyNetCashflow >= 0 ? "+" : ""}
                  {formatRm(calc.monthlyNetCashflow)} / bulan
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded font-semibold uppercase ${
                  calc.monthlyNetCashflow >= 0
                    ? "bg-emerald-200 text-emerald-900"
                    : "bg-rose-200 text-rose-900"
                }`}
              >
                {calc.monthlyNetCashflow >= 0 ? "Aliran Tunai Positif" : "Aliran Tunai Negatif"}
              </span>
            </div>
            <p className="text-xs mt-2 m-0 leading-relaxed opacity-90">
              {calc.monthlyNetCashflow >= 0
                ? "Unit ini menjana lebihan tunai bersih setiap bulan selepas menampung sepenuhnya bayaran pinjaman bank dan kos pengurusan."
                : "Unit ini memerlukan penambahan duit poket bulanan bagi menampung pinjaman. Pelaburan ini lazimnya bergantung pada potensi kenaikan nilai modal (Capital Appreciation)."}
            </p>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2.5 pt-2 text-xs border-t border-[var(--color-rule)]/60 text-[var(--color-ink-2)]">
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span>Pendapatan Sewa Tahunan Kasar:</span>
              <strong className="text-[var(--color-ink)] tabular-nums font-medium">
                {formatRm(calc.annualGrossRent)}
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span>Kos Penyelenggaraan Tahunan (Maintenance):</span>
              <span className="tabular-nums">- {formatRm(calc.maintenanceMonthly * 12)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span>Cukai Pintu, Cukai Tanah &amp; Insurans:</span>
              <span className="tabular-nums">- {formatRm(parseNum(annualTaxText) + parseNum(annualInsuranceText))}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span>Pendapatan Bersih Tahunan Unit:</span>
              <strong className="text-emerald-800 tabular-nums font-semibold">
                {formatRm(calc.annualNetRent)}
              </strong>
            </div>
            <div className="flex justify-between py-1 pt-1 text-[var(--color-muted)]">
              <span>Komitmen Ansuran Bank Tahunan:</span>
              <span className="tabular-nums">{formatRm(calc.installment * 12)} / tahun</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="sheet p-5 bg-[var(--color-paper-2)] border border-[var(--color-rule)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)] m-0">
              Mencari unit pelaburan dengan Rental Yield &gt; 5.5%?
            </h3>
            <p className="text-xs text-[var(--color-ink-2)] mt-0.5 m-0">
              Kami memantau inventori sewa sekitar universiti &amp; LRT di Setapak, Wangsa Maju dan KL.
            </p>
          </div>
          <a
            href={whatsappHref}
            className="btn btn--primary whitespace-nowrap self-stretch sm:self-auto text-center inline-flex items-center justify-center gap-1.5"
          >
            Bincang Potensi Pelaburan
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
