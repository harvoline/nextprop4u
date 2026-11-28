"use client";

import { useState, useMemo } from "react";
import {
  Receipt,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calendar,
  FileText,
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

export function TenancyStampingCalculator() {
  const [rentText, setRentText] = useState("1800");
  const [tenureCategory, setTenureCategory] = useState<"1year" | "2to3years" | "more3years">("1year");
  const [duplicateCopies, setDuplicateCopies] = useState(1); // 1 duplicate is standard (1 for tenant, 1 for landlord)
  const [includeAdminFee, setIncludeAdminFee] = useState(true);

  const calc = useMemo(() => {
    const monthlyRent = parseNum(rentText);
    const annualRent = monthlyRent * 12;

    // LHDN Exemption: First RM2,400 exempted
    const taxableAmount = Math.max(0, annualRent - 2400);
    const unitsOf250 = taxableAmount > 0 ? Math.ceil(taxableAmount / 250) : 0;

    let ratePerUnit = 1; // 1 year
    let tenureLabel = "1 Tahun atau Kurang";
    if (tenureCategory === "2to3years") {
      ratePerUnit = 2;
      tenureLabel = "1 hingga 3 Tahun (Cth. 2 Tahun)";
    } else if (tenureCategory === "more3years") {
      ratePerUnit = 4;
      tenureLabel = "Melebihi 3 Tahun";
    }

    const originalStampDuty = unitsOf250 * ratePerUnit;
    const duplicateStampDuty = duplicateCopies * 10;
    const totalLhdnDuty = originalStampDuty + duplicateStampDuty;

    // Standard drafting & administration fee scale
    let adminFee = 0;
    if (includeAdminFee) {
      if (monthlyRent <= 1000) adminFee = 150;
      else if (monthlyRent <= 2000) adminFee = 250;
      else if (monthlyRent <= 3000) adminFee = 350;
      else adminFee = 450;
    }

    const totalCost = totalLhdnDuty + adminFee;

    return {
      monthlyRent,
      annualRent,
      taxableAmount,
      unitsOf250,
      ratePerUnit,
      tenureLabel,
      originalStampDuty,
      duplicateStampDuty,
      totalLhdnDuty,
      adminFee,
      totalCost,
    };
  }, [rentText, tenureCategory, duplicateCopies, includeAdminFee]);

  const whatsappHref = useMemo(() => {
    const msg = `Hai Afif, saya ingin mematikan setem perjanjian sewa rumah (Tenancy Agreement):\n- Kadar Sewa: ${formatRm(calc.monthlyRent)} / bln\n- Tempoh: ${calc.tenureLabel}\n- Anggaran Duti Setem LHDN: ${formatRm(calc.totalLhdnDuty)}\n- Anggaran Keseluruhan (Termasuk Stamping & Draf): ${formatRm(calc.totalCost)}\nBoleh bantu uruskan perjanjian sewa & semakan stamping LHDN rasmi?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [calc]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Form */}
      <div className="lg:col-span-5 sheet p-6 sm:p-8 border border-[var(--color-rule)]/70">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-rule)]/60">
          <Receipt className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-display text-[var(--color-ink)] m-0 font-medium">
            Butiran Sewaan &amp; Perjanjian
          </h2>
        </div>

        <div className="space-y-5">
          {/* Kadar Sewa Bulanan */}
          <div className="field-group">
            <label htmlFor="input-ta-rent" className="field-label flex justify-between">
              <span>Sewa Bulanan (RM)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                Sewa Setahun: {formatRm(calc.annualRent)}
              </span>
            </label>
            <input
              id="input-ta-rent"
              type="text"
              inputMode="numeric"
              value={rentText}
              onChange={(e) => setRentText(e.target.value.replace(/[^\d]/g, ""))}
              className="studio-input tabular-nums font-medium text-base text-purple-900"
              placeholder="1800"
            />
          </div>

          {/* Tempoh Perjanjian */}
          <div className="field-group">
            <label htmlFor="input-ta-tenure" className="field-label">
              Tempoh Sewaan (Tenure)
            </label>
            <select
              id="input-ta-tenure"
              value={tenureCategory}
              onChange={(e) => setTenureCategory(e.target.value as any)}
              className="studio-input"
            >
              <option value="1year">1 Tahun atau Kurang (Kadar RM1 / RM250)</option>
              <option value="2to3years">1 hingga 3 Tahun (Cth. 2 Tahun - RM2 / RM250)</option>
              <option value="more3years">Melebihi 3 Tahun (Kadar RM4 / RM250)</option>
            </select>
            <span className="text-[11px] text-[var(--color-muted)] mt-1 block">
              Kebanyakan tenancy agreement kediaman menggunakan tempoh 1 tahun atau 2 tahun.
            </span>
          </div>

          {/* Salinan Pendua */}
          <div className="field-group">
            <label htmlFor="input-ta-copies" className="field-label flex justify-between">
              <span>Bilangan Salinan Pendua (Duplicate)</span>
              <span className="text-xs text-[var(--color-muted)] font-normal">
                RM10 / salinan
              </span>
            </label>
            <select
              id="input-ta-copies"
              value={duplicateCopies}
              onChange={(e) => setDuplicateCopies(Number(e.target.value))}
              className="studio-input"
            >
              <option value={1}>1 Salinan Pendua (Standard: 1 Tuan Rumah, 1 Penyewa)</option>
              <option value={2}>2 Salinan Pendua</option>
              <option value={0}>0 Salinan Pendua (Hanya Salinan Asal)</option>
            </select>
          </div>

          {/* Checkbox Admin fee */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 rounded-md bg-[var(--color-paper-2)] cursor-pointer hover:bg-[var(--color-paper-3)] transition-colors">
              <input
                type="checkbox"
                checked={includeAdminFee}
                onChange={(e) => setIncludeAdminFee(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
              <div>
                <strong className="text-xs font-semibold text-[var(--color-ink)] block">
                  Sertakan Anggaran Kos Penyediaan Perjanjian Sewa
                </strong>
                <span className="text-[11px] text-[var(--color-muted)] block mt-0.5 leading-snug">
                  Kos draf dokumen tenancy agreement piawai, klausa hak milik, dan pematuhan LHDN.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Output Readout */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
        <div className="sheet p-6 sm:p-8 bg-[var(--color-paper-hi)] border border-[var(--color-rule)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Jumlah Duti Setem LHDN
          </span>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl sm:text-4xl font-display font-medium text-purple-900 tabular-nums">
              {formatRm(calc.totalLhdnDuty)}
            </span>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              (Salinan Asal: {formatRm(calc.originalStampDuty)} + Pendua: {formatRm(calc.duplicateStampDuty)})
            </span>
          </div>

          {/* LHDN Legal Stamping Certificate Notice */}
          <div className="p-4 rounded-md mb-6 bg-purple-50 border border-purple-200 text-purple-950 flex items-start gap-2.5 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div>
              <strong>Status Perjanjian Sah LHDN:</strong>
              <p className="m-0 mt-0.5 opacity-90">
                Pengecualian asas RM2,400 setahun telah ditolak. Sijil Setem Digital rasmi LHDN (Lembaga Hasil Dalam Negeri) diperlukan agar perjanjian boleh dikuatkuasakan di mahkamah sekiranya berlaku pertikaian.
              </p>
            </div>
          </div>

          {/* Detailed Calculations breakdown */}
          <div className="space-y-3 pt-1 text-xs text-[var(--color-ink-2)]">
            <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
              <span>Jumlah Sewa Setahun ({formatRm(calc.monthlyRent)} Ã 12 bln):</span>
              <strong className="text-[var(--color-ink)] tabular-nums">{formatRm(calc.annualRent)}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
              <span>Pengecualian Asas Rasmi LHDN:</span>
              <span className="text-emerald-700 font-medium tabular-nums">- RM 2,400</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
              <span>Baki Sewa Dikenakan Duti:</span>
              <strong className="text-[var(--color-ink)] tabular-nums">{formatRm(calc.taxableAmount)}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
              <span>Bilangan Unit Gandaan RM250:</span>
              <span className="tabular-nums">{calc.unitsOf250} unit Ã RM{calc.ratePerUnit}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
              <span>Duti Setem Dokumen Asal:</span>
              <strong className="text-[var(--color-ink)] tabular-nums">{formatRm(calc.originalStampDuty)}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
              <span>Duti Setem Salinan Pendua ({duplicateCopies} salinan @ RM10):</span>
              <strong className="text-[var(--color-ink)] tabular-nums">{formatRm(calc.duplicateStampDuty)}</strong>
            </div>

            {includeAdminFee && (
              <div className="flex justify-between py-1.5 border-b border-[var(--color-rule)]/50">
                <span>Anggaran Kos Draf Dokumen Perjanjian Sewa:</span>
                <strong className="text-[var(--color-ink)] tabular-nums">{formatRm(calc.adminFee)}</strong>
              </div>
            )}

            <div className="p-4 rounded-md bg-[var(--color-paper-2)] border border-[var(--color-rule)] flex justify-between items-center mt-4">
              <div>
                <strong className="text-sm text-[var(--color-ink)] block">
                  Anggaran Jumlah Keseluruhan
                </strong>
                <span className="text-[11px] text-[var(--color-muted)]">
                  Duti setem LHDN {includeAdminFee ? "+ Kos penyediaan perjanjian" : ""}
                </span>
              </div>
              <span className="text-xl font-display font-medium text-purple-900 tabular-nums">
                {formatRm(calc.totalCost)}
              </span>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="sheet p-5 bg-[var(--color-paper-2)] border border-[var(--color-rule)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)] m-0">
              Perlukan bantuan urusan Tenancy Agreement &amp; Stamping LHDN?
            </h3>
            <p className="text-xs text-[var(--color-ink-2)] mt-0.5 m-0">
              Kami menyediakan pengurusan perjanjian sewa lengkap termasuk saringan profil penyewa dan stamping LHDN rasmi.
            </p>
          </div>
          <a
            href={whatsappHref}
            className="btn btn--primary whitespace-nowrap self-stretch sm:self-auto text-center inline-flex items-center justify-center gap-1.5"
          >
            Urus Perjanjian Sewa
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
