"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Info,
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

// Calculate MOT Stamp Duty (Tiered)
function calcMotStampDuty(price: number, isFirstHome: boolean): number {
  if (price <= 0) return 0;
  if (isFirstHome && price <= 500000) return 0; // 100% exemption for first home <= RM500k

  let duty = 0;
  let rem = price;

  // Tier 1: First 100k @ 1%
  const t1 = Math.min(rem, 100000);
  duty += t1 * 0.01;
  rem -= t1;

  // Tier 2: Next 400k (100k-500k) @ 2%
  if (rem > 0) {
    const t2 = Math.min(rem, 400000);
    duty += t2 * 0.02;
    rem -= t2;
  }

  // Tier 3: Next 500k (500k-1M) @ 3%
  if (rem > 0) {
    const t3 = Math.min(rem, 500000);
    duty += t3 * 0.03;
    rem -= t3;
  }

  // Tier 4: Exceeding 1M @ 4%
  if (rem > 0) {
    duty += rem * 0.04;
  }

  return duty;
}

// Calculate SRO 2023 Legal Fees (Tiered Scale)
function calcLegalFeeSRO2023(amount: number): number {
  if (amount <= 0) return 0;
  let fee = 0;
  let rem = amount;

  // Tier 1: First RM500k @ 1.25% (min RM500)
  const t1 = Math.min(rem, 500000);
  fee += Math.max(500, t1 * 0.0125);
  rem -= t1;

  // Tier 2: Next RM500k (up to RM1M) @ 1.00%
  if (rem > 0) {
    const t2 = Math.min(rem, 500000);
    fee += t2 * 0.01;
    rem -= t2;
  }

  // Tier 3: Next RM2M (up to RM3M) @ 0.75%
  if (rem > 0) {
    const t3 = Math.min(rem, 2000000);
    fee += t3 * 0.0075;
    rem -= t3;
  }

  // Tier 4: Next RM2M (up to RM5M) @ 0.60%
  if (rem > 0) {
    const t4 = Math.min(rem, 2000000);
    fee += t4 * 0.006;
    rem -= t4;
  }

  // Tier 5: Exceeding RM5M @ 0.50%
  if (rem > 0) {
    fee += rem * 0.005;
  }

  return fee;
}

export function StampDutyLegalCalculator() {
  const [priceText, setPriceText] = useState("500000");
  const [loanPct, setLoanPct] = useState(90);
  const [isFirstHome, setIsFirstHome] = useState(true);
  const [includeLoanDocs, setIncludeLoanDocs] = useState(true);

  const calc = useMemo(() => {
    const price = parseNum(priceText);
    const loanAmount = includeLoanDocs ? price * (loanPct / 100) : 0;
    const depositAmount = price * ((100 - loanPct) / 100);

    // 1. MOT Stamp Duty
    const motDuty = calcMotStampDuty(price, isFirstHome);
    const rawMotDutyWithoutExemption = calcMotStampDuty(price, false);
    const motSaved = rawMotDutyWithoutExemption - motDuty;

    // 2. Loan Stamp Duty (0.5% flat)
    let loanDuty = 0;
    let loanDutySaved = 0;
    if (includeLoanDocs && loanAmount > 0) {
      const rawLoanDuty = loanAmount * 0.005;
      if (isFirstHome && price <= 500000) {
        loanDuty = 0;
        loanDutySaved = rawLoanDuty;
      } else {
        loanDuty = rawLoanDuty;
      }
    }

    // 3. SPA Legal Fee + SST 8%
    const spaLegalFee = calcLegalFeeSRO2023(price);
    const spaSst = spaLegalFee * 0.08;
    const spaDisbursement = price > 0 ? 1500 : 0; // Estimated land search, bankruptcy, travel, stamping

    // 4. Loan Agreement Legal Fee + SST 8%
    const loanLegalFee = includeLoanDocs ? calcLegalFeeSRO2023(loanAmount) : 0;
    const loanSst = loanLegalFee * 0.08;
    const loanDisbursement = includeLoanDocs && loanAmount > 0 ? 1500 : 0;

    // Subtotals
    const totalStampDuties = motDuty + loanDuty;
    const totalLegalFees = spaLegalFee + spaSst + loanLegalFee + loanSst;
    const totalDisbursements = spaDisbursement + loanDisbursement;

    const totalEntryCostsWithoutDeposit = totalStampDuties + totalLegalFees + totalDisbursements;
    const totalInitialCashRequired = depositAmount + totalEntryCostsWithoutDeposit;
    const totalSavingsFromFirstHome = motSaved + loanDutySaved;

    return {
      price,
      loanAmount,
      depositAmount,
      motDuty,
      rawMotDutyWithoutExemption,
      motSaved,
      loanDuty,
      loanDutySaved,
      spaLegalFee,
      spaSst,
      spaDisbursement,
      loanLegalFee,
      loanSst,
      loanDisbursement,
      totalStampDuties,
      totalLegalFees,
      totalDisbursements,
      totalEntryCostsWithoutDeposit,
      totalInitialCashRequired,
      totalSavingsFromFirstHome,
    };
  }, [priceText, loanPct, isFirstHome, includeLoanDocs]);

  const whatsappHref = useMemo(() => {
    const msg = `Hai Afif, saya membuat semakan Duti Setem & Kos Guaman di NextProp4U:\n- Harga Rumah: ${formatRm(calc.price)}\n- Status: ${isFirstHome ? "Pembeli Rumah Pertama (Pengecualian MOT)" : "Bukan Rumah Pertama"}\n- Anggaran Duti Setem MOT: ${formatRm(calc.motDuty)}\n- Anggaran Kos Guaman (SPA + Loan): ${formatRm(calc.totalLegalFees)}\n- Anggaran Tunai Masuk Diperlukan: ${formatRm(calc.totalInitialCashRequired)}\nBoleh bantu cadangkan peguam panel & semak kelayakan pembelian saya?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [calc, isFirstHome]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-5 sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-rule)]/60">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-display text-[var(--color-ink)] m-0 font-medium">
            Maklumat Pembelian Hartanah
          </h2>
        </div>

        <div className="space-y-5">
          {/* Harga Hartanah */}
          <div className="field-group">
            <label htmlFor="input-spa-price" className="field-label flex justify-between">
              <span>Harga Perjanjian Jual Beli (SPA)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                {formatRm(calc.price)}
              </span>
            </label>
            <input
              id="input-spa-price"
              type="text"
              inputMode="numeric"
              value={priceText}
              onChange={(e) => setPriceText(e.target.value.replace(/[^\d]/g, ""))}
              className="studio-input tabular-nums font-medium text-base"
              placeholder="500000"
            />
          </div>

          {/* Peratus Margin Pinjaman */}
          <div className="field-group">
            <label htmlFor="input-loan-pct" className="field-label flex justify-between">
              <span>Margin Pembiayaan Bank</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                Pinjaman: {formatRm(calc.loanAmount)}
              </span>
            </label>
            <select
              id="input-loan-pct"
              value={loanPct}
              onChange={(e) => setLoanPct(Number(e.target.value))}
              className="studio-input"
            >
              <option value={90}>90% Pembiayaan (10% Deposit Standard)</option>
              <option value={95}>95% Pembiayaan (5% Deposit)</option>
              <option value={100}>100% Pembiayaan Penuh (Skim Rumah Pertamaku)</option>
              <option value={80}>80% Pembiayaan (20% Deposit)</option>
              <option value={70}>70% Pembiayaan (30% Deposit)</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div className="pt-3 space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-paper-2)] cursor-pointer hover:bg-[var(--color-paper-3)] transition-colors">
              <input
                type="checkbox"
                checked={isFirstHome}
                onChange={(e) => setIsFirstHome(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <div>
                <strong className="text-xs font-semibold text-[var(--color-ink)] block">
                  Pembeli Rumah Pertama (Pengecualian Duti Setem)
                </strong>
                <span className="text-[11px] text-[var(--color-muted)] block mt-0.5 leading-snug">
                  Pengecualian 100% duti setem MOT &amp; pinjaman untuk rumah berharga â¤ RM500,000.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-paper-2)] cursor-pointer hover:bg-[var(--color-paper-3)] transition-colors">
              <input
                type="checkbox"
                checked={includeLoanDocs}
                onChange={(e) => setIncludeLoanDocs(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <div>
                <strong className="text-xs font-semibold text-[var(--color-ink)] block">
                  Sertakan Dokumen Pinjaman Bank
                </strong>
                <span className="text-[11px] text-[var(--color-muted)] block mt-0.5 leading-snug">
                  Kira kos guaman &amp; duti setem surat perjanjian pinjaman perumahan.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Breakdown Readout */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
        <div className="sheet p-6 sm:p-8 bg-[var(--color-paper-hi)] border border-[var(--color-rule)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Anggaran Jumlah Kos Guaman &amp; Duti Setem
          </span>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink)] tabular-nums">
              {formatRm(calc.totalEntryCostsWithoutDeposit)}
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">(Tidak termasuk wang deposit)</span>
          </div>

          {/* First home buyer alert if applied */}
          {calc.totalSavingsFromFirstHome > 0 && (
            <div className="p-3.5 rounded-md mb-6 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Penjimatan Rumah Pertama Anda: {formatRm(calc.totalSavingsFromFirstHome)}!</strong>
                <p className="m-0 mt-0.5 opacity-90">
                  Duti setem MOT &amp; pinjaman bank dikecualikan 100% di bawah skim kerajaan untuk hartanah bawah RM500k.
                </p>
              </div>
            </div>
          )}

          {/* Itemized Table */}
          <div className="space-y-4 pt-1 text-xs">
            {/* Section A: Duti Setem LHDN */}
            <div className="bg-[var(--color-paper-2)]/60 p-3.5 rounded-md">
              <div className="flex justify-between font-semibold text-[var(--color-ink)] mb-2 pb-1 border-b border-[var(--color-rule)]/60">
                <span>1. Duti Setem Kerajaan (LHDN)</span>
                <span className="tabular-nums">{formatRm(calc.totalStampDuties)}</span>
              </div>
              <div className="space-y-1.5 text-[var(--color-ink-2)]">
                <div className="flex justify-between">
                  <span>â¢ Duti Setem MOT (Surat Cara Pindah Milik):</span>
                  <span className="tabular-nums font-medium">
                    {calc.motDuty === 0 && isFirstHome && calc.price <= 500000 ? (
                      <span className="text-emerald-700 font-semibold">RM 0 (Pengecualian)</span>
                    ) : (
                      formatRm(calc.motDuty)
                    )}
                  </span>
                </div>
                {includeLoanDocs && (
                  <div className="flex justify-between">
                    <span>â¢ Duti Setem Surat Perjanjian Pinjaman (0.5%):</span>
                    <span className="tabular-nums font-medium">
                      {calc.loanDuty === 0 && isFirstHome && calc.price <= 500000 ? (
                        <span className="text-emerald-700 font-semibold">RM 0 (Pengecualian)</span>
                      ) : (
                        formatRm(calc.loanDuty)
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Section B: Fi Guaman SRO 2023 */}
            <div className="bg-[var(--color-paper-2)]/60 p-3.5 rounded-md">
              <div className="flex justify-between font-semibold text-[var(--color-ink)] mb-2 pb-1 border-b border-[var(--color-rule)]/60">
                <span>2. Kos Guaman Profesional (Skala SRO 2023)</span>
                <span className="tabular-nums">{formatRm(calc.totalLegalFees)}</span>
              </div>
              <div className="space-y-1.5 text-[var(--color-ink-2)]">
                <div className="flex justify-between">
                  <span>â¢ Fi Guaman Perjanjian Jual Beli (SPA) + 8% SST:</span>
                  <span className="tabular-nums font-medium">
                    {formatRm(calc.spaLegalFee + calc.spaSst)}
                  </span>
                </div>
                {includeLoanDocs && (
                  <div className="flex justify-between">
                    <span>â¢ Fi Guaman Dokumentasi Pinjaman Bank + 8% SST:</span>
                    <span className="tabular-nums font-medium">
                      {formatRm(calc.loanLegalFee + calc.loanSst)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Section C: Disbursement & Pendaftaran Pejabat Tanah */}
            <div className="bg-[var(--color-paper-2)]/60 p-3.5 rounded-md">
              <div className="flex justify-between font-semibold text-[var(--color-ink)] mb-2 pb-1 border-b border-[var(--color-rule)]/60">
                <span>3. Anggaran Disbursement &amp; Pendaftaran Tanah</span>
                <span className="tabular-nums">{formatRm(calc.totalDisbursements)}</span>
              </div>
              <div className="text-[11px] text-[var(--color-muted)] leading-relaxed">
                Meliputi carian hakmilik tanah, carian muflis, pendaftaran di Pejabat Tanah KL/Selangor, pengesyoran, dan kos cetakan rasmi.
              </div>
            </div>

            {/* Total Initial Cash Required */}
            <div className="p-4 rounded-md bg-[var(--color-paper)] border border-[var(--color-rule)] flex justify-between items-center">
              <div>
                <strong className="text-sm text-[var(--color-ink)] block">
                  Anggaran Keseluruhan Tunai Masuk (Termasuk Deposit)
                </strong>
                <span className="text-[11px] text-[var(--color-muted)]">
                  Wang deposit {100 - loanPct}% ({formatRm(calc.depositAmount)}) + Kos guaman &amp; duti setem
                </span>
              </div>
              <span className="text-lg sm:text-xl font-display font-medium text-emerald-800 tabular-nums">
                {formatRm(calc.totalInitialCashRequired)}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Consultation Action */}
        <div className="sheet p-5 bg-[var(--color-paper-2)] border border-[var(--color-rule)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)] m-0">
              Perlukan sebut harga rasmi daripada peguam panel?
            </h3>
            <p className="text-xs text-[var(--color-ink-2)] mt-0.5 m-0">
              Kami bekerjasama dengan peguam hartanah berdaftar di KL &amp; Selangor untuk semakan hakmilik dan kos tepat.
            </p>
          </div>
          <a
            href={whatsappHref}
            className="btn btn--primary whitespace-nowrap self-stretch sm:self-auto text-center inline-flex items-center justify-center gap-1.5"
          >
            Dapatkan Nasihat Guaman
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
