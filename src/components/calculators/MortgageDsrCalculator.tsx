"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Coins,
  Calendar,
  Percent,
  DollarSign,
  FileSpreadsheet,
  Sparkles,
} from "lucide-react";

const WHATSAPP_NUMBER = "601158683907";

function formatRm(value: number) {
  return `RM ${Math.round(value).toLocaleString("en-MY")}`;
}

function parseNum(raw: string): number {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const p = parseFloat(cleaned);
  return Number.isFinite(p) ? p : 0;
}

export function MortgageDsrCalculator() {
  const [priceText, setPriceText] = useState("500000");
  const [depositPct, setDepositPct] = useState(10);
  const [tenureYears, setTenureYears] = useState(35);
  const [rateText, setRateText] = useState("4.15");
  const [incomeText, setIncomeText] = useState("6500");
  const [commitText, setCommitText] = useState("1200");

  const calc = useMemo(() => {
    const price = parseNum(priceText);
    const ratePct = parseNum(rateText) || 4.15;
    const annualRate = ratePct / 100;
    const monthlyRate = annualRate / 12;
    const income = parseNum(incomeText);
    const commit = parseNum(commitText);

    const depositAmount = price * (depositPct / 100);
    const loanAmount = Math.max(0, price - depositAmount);
    const totalMonths = tenureYears * 12;

    let monthlyInstallment = 0;
    if (loanAmount > 0 && totalMonths > 0) {
      if (monthlyRate > 0) {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        monthlyInstallment = (loanAmount * monthlyRate * factor) / (factor - 1);
      } else {
        monthlyInstallment = loanAmount / totalMonths;
      }
    }

    const totalPayment = monthlyInstallment * totalMonths;
    const totalInterest = Math.max(0, totalPayment - loanAmount);

    // DSR Calculation
    const totalCommitmentWithLoan = commit + monthlyInstallment;
    const dsrPct = income > 0 ? (totalCommitmentWithLoan / income) * 100 : 0;
    const currentDsrPct = income > 0 ? (commit / income) * 100 : 0;

    // Status evaluation based on standard Malaysian bank guidelines
    let dsrStatus: "ideal" | "moderate" | "high" = "ideal";
    let statusText = "";
    if (dsrPct <= 60) {
      dsrStatus = "ideal";
      statusText = "Sangat Layak (DSR di bawah had selesa 60% kebanyakan bank)";
    } else if (dsrPct <= 70) {
      dsrStatus = "moderate";
      statusText = "Layak Bersyarat (DSR 60%-70%, sesetengah bank terima jika pendapatan bersih > RM3.5k)";
    } else {
      dsrStatus = "high";
      statusText = "Melebihi Had (DSR melebihi 70%, disarankan laras deposit atau penjamin bersama)";
    }

    // Minimum salary needed at 60% DSR
    const minIncomeNeeded = totalCommitmentWithLoan / 0.6;

    return {
      price,
      depositAmount,
      loanAmount,
      monthlyInstallment,
      totalPayment,
      totalInterest,
      income,
      commit,
      currentDsrPct,
      dsrPct,
      dsrStatus,
      statusText,
      minIncomeNeeded,
      ratePct,
    };
  }, [priceText, depositPct, tenureYears, rateText, incomeText, commitText]);

  const whatsappHref = useMemo(() => {
    const msg = `Hai Afif, saya membuat semakan pinjaman di NextProp4U:\n- Harga Rumah: ${formatRm(calc.price)}\n- Pinjaman (${100 - depositPct}%, ${tenureYears} thn, ${calc.ratePct}%): ${formatRm(calc.loanAmount)}\n- Ansuran Bulanan: ${formatRm(calc.monthlyInstallment)} / bln\n- Pendapatan Bersih: ${formatRm(calc.income)} | Komitmen: ${formatRm(calc.commit)}\n- Skor DSR: ${calc.dsrPct.toFixed(1)}% (${calc.dsrStatus === "ideal" ? "Layak" : "Perlu Nasihat"})\nBoleh bantu semak senarai bank yang sesuai & unit hartanah di Setapak / KL / Selangor?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [calc, depositPct, tenureYears]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Input Form */}
      <div className="lg:col-span-6 sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-rule)]/60">
          <Calculator className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-display text-[var(--color-ink)] m-0 font-medium">
            Maklumat Pinjaman &amp; Pendapatan
          </h2>
        </div>

        <div className="space-y-5">
          {/* Harga Hartanah */}
          <div className="field-group">
            <label htmlFor="input-price" className="field-label flex justify-between">
              <span>Harga Hartanah (RM)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                {formatRm(calc.price)}
              </span>
            </label>
            <input
              id="input-price"
              type="text"
              inputMode="numeric"
              value={priceText}
              onChange={(e) => setPriceText(e.target.value.replace(/[^\d]/g, ""))}
              className="studio-input tabular-nums font-medium text-base"
              placeholder="500000"
            />
          </div>

          {/* Deposit & Margin */}
          <div className="grid grid-cols-2 gap-4">
            <div className="field-group">
              <label htmlFor="input-deposit" className="field-label">
                Wang Pendahuluan
              </label>
              <select
                id="input-deposit"
                value={depositPct}
                onChange={(e) => setDepositPct(Number(e.target.value))}
                className="studio-input"
              >
                <option value={0}>0% (Pinjaman Penuh)</option>
                <option value={5}>5% Deposit</option>
                <option value={10}>10% Deposit (Standard)</option>
                <option value={15}>15% Deposit</option>
                <option value={20}>20% Deposit</option>
                <option value={30}>30% Deposit</option>
              </select>
              <span className="text-[11px] text-[var(--color-muted)] mt-1 block">
                Deposit: {formatRm(calc.depositAmount)}
              </span>
            </div>

            <div className="field-group">
              <label htmlFor="input-tenure" className="field-label">
                Tempoh Pinjaman
              </label>
              <select
                id="input-tenure"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="studio-input"
              >
                <option value={15}>15 Tahun</option>
                <option value={20}>20 Tahun</option>
                <option value={25}>25 Tahun</option>
                <option value={30}>30 Tahun</option>
                <option value={35}>35 Tahun (Maksimum)</option>
              </select>
              <span className="text-[11px] text-[var(--color-muted)] mt-1 block">
                {tenureYears * 12} bulan bayaran
              </span>
            </div>
          </div>

          {/* Kadar Faedah */}
          <div className="field-group">
            <label htmlFor="input-rate" className="field-label flex justify-between">
              <span>Kadar Faedah Indikatif Setahun (%)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                Kadar purata bank 2026: 4.00% - 4.30%
              </span>
            </label>
            <input
              id="input-rate"
              type="number"
              step="0.05"
              value={rateText}
              onChange={(e) => setRateText(e.target.value)}
              className="studio-input tabular-nums"
              placeholder="4.15"
            />
          </div>

          <div className="pt-4 border-t border-[var(--color-rule)]/60">
            <span className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider block mb-3">
              Semakan Had Kelayakan DSR
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="field-group">
                <label htmlFor="input-income" className="field-label">
                  Pendapatan Bersih (RM/bln)
                </label>
                <input
                  id="input-income"
                  type="text"
                  inputMode="numeric"
                  value={incomeText}
                  onChange={(e) => setIncomeText(e.target.value.replace(/[^\d]/g, ""))}
                  className="studio-input tabular-nums"
                  placeholder="6500"
                />
                <span className="text-[11px] text-[var(--color-muted)] mt-1 block">
                  Gaji selepas tolak KWSP &amp; SOCSO
                </span>
              </div>

              <div className="field-group">
                <label htmlFor="input-commit" className="field-label">
                  Komitmen Sedia Ada (RM/bln)
                </label>
                <input
                  id="input-commit"
                  type="text"
                  inputMode="numeric"
                  value={commitText}
                  onChange={(e) => setCommitText(e.target.value.replace(/[^\d]/g, ""))}
                  className="studio-input tabular-nums"
                  placeholder="1200"
                />
                <span className="text-[11px] text-[var(--color-muted)] mt-1 block">
                  Kereta, kad kredit, PTPTN, pinjaman peribadi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Results & Readout */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
        <div className="sheet p-6 sm:p-8 bg-[var(--color-paper-hi)] border border-[var(--color-rule)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Keputusan Ansuran Bulanan
          </span>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink)] tabular-nums">
              {formatRm(calc.monthlyInstallment)}
            </span>
            <span className="text-sm text-[var(--color-muted)] font-medium">/ bulan</span>
          </div>

          {/* DSR Indicator Badge */}
          <div
            className={`p-4 rounded-md mb-6 border ${
              calc.dsrStatus === "ideal"
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                : calc.dsrStatus === "moderate"
                ? "bg-amber-50/80 border-amber-200 text-amber-900"
                : "bg-rose-50/80 border-rose-200 text-rose-900"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {calc.dsrStatus === "ideal" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-semibold">
                    DSR: {calc.dsrPct.toFixed(1)}% Komitmen Pendapatan
                  </strong>
                </div>
                <p className="text-xs mt-1 m-0 leading-relaxed opacity-90">
                  {calc.statusText}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3 pt-2 text-xs border-t border-[var(--color-rule)]/60">
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span className="text-[var(--color-ink-2)]">Jumlah Pinjaman Bank:</span>
              <strong className="text-[var(--color-ink)] tabular-nums font-medium">
                {formatRm(calc.loanAmount)} ({100 - depositPct}%)
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span className="text-[var(--color-ink-2)]">Deposit Perlu Dibayar:</span>
              <strong className="text-[var(--color-ink)] tabular-nums font-medium">
                {formatRm(calc.depositAmount)} ({depositPct}%)
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span className="text-[var(--color-ink-2)]">Anggaran Faedah Pinjaman:</span>
              <strong className="text-[var(--color-ink)] tabular-nums font-medium">
                {formatRm(calc.totalInterest)}
              </strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[var(--color-rule)]/40">
              <span className="text-[var(--color-ink-2)]">Jumlah Bayaran Balik ({tenureYears} Tahun):</span>
              <strong className="text-[var(--color-ink)] tabular-nums font-medium">
                {formatRm(calc.totalPayment)}
              </strong>
            </div>
            <div className="flex justify-between py-1 pt-2 text-emerald-800 font-semibold">
              <span>Gaji Minimum Disyorkan (Had 60% DSR):</span>
              <span className="tabular-nums">{formatRm(calc.minIncomeNeeded)} / bln</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Call to Action */}
        <div className="sheet p-5 bg-[var(--color-paper-2)] border border-[var(--color-rule)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)] m-0">
              Ingin semakan kelayakan panel bank secara percuma?
            </h3>
            <p className="text-xs text-[var(--color-ink-2)] mt-0.5 m-0">
              Hantar kiraan ini terus kepada Muhammad Norafif untuk tapisan CCRIS &amp; CTOS pantas.
            </p>
          </div>
          <a
            href={whatsappHref}
            className="btn btn--primary whitespace-nowrap self-stretch sm:self-auto text-center inline-flex items-center justify-center gap-1.5"
          >
            Semak Melalui WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
