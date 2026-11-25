"use client";

import { useMemo, useRef, useState } from "react";

type DeskMode = "kelayakan" | "mandat";

const DESK_MODES: DeskMode[] = ["kelayakan", "mandat"];
const WHATSAPP_NUMBER = "601158683907";
const RATE_ANNUAL = 0.0415; // Bank indicative housing loan benchmark rate

function formatRm(value: number) {
  return `RM ${Math.round(value).toLocaleString("en-MY")}`;
}

function parseNumericInput(raw: string): number {
  const cleaned = raw.replace(/[^\d]/g, "");
  if (!cleaned) return 0;
  const parsed = Number.parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function LoanWorkbench() {
  const [mode, setMode] = useState<DeskMode>("kelayakan");
  const modeRefs = useRef<Partial<Record<DeskMode, HTMLButtonElement | null>>>({});

  // Mode 1: DSR & Mortgage Estimator state (controlled strings avoid zero-snap while typing)
  const [priceText, setPriceText] = useState<string>("480000");
  const [depositPct, setDepositPct] = useState<number>(10);
  const [tenureYears, setTenureYears] = useState<number>(35);
  const [incomeText, setIncomeText] = useState<string>("6500");
  const [commitText, setCommitText] = useState<string>("1200");

  // Mode 2: Property Inquiry Builder state
  const [intent, setIntent] = useState<string>("Jual Hartanah");
  const [area, setArea] = useState<string>("Setapak & Wangsa Maju, KL");
  const [propType, setPropType] = useState<string>("Teres Dua Tingkat");
  const [targetValue, setTargetValue] = useState<string>("550000");

  const calc = useMemo(() => {
    const safePrice = parseNumericInput(priceText);
    const safeIncome = parseNumericInput(incomeText);
    const safeCommit = parseNumericInput(commitText);

    const loanAmount = safePrice * (1 - depositPct / 100);
    const monthlyRate = RATE_ANNUAL / 12;
    const months = tenureYears * 12;
    const factor = Math.pow(1 + monthlyRate, months);
    const monthlyInstallment =
      months > 0 && factor > 1 ? (loanAmount * monthlyRate * factor) / (factor - 1) : 0;

    const maxDsrCapacity = Math.max(0, safeIncome * 0.6 - safeCommit);
    const dsrUsedPct = safeIncome > 0 ? ((safeCommit + monthlyInstallment) / safeIncome) * 100 : 0;
    const statusLabel =
      safeIncome <= 0
        ? "Masukkan pendapatan bersih"
        : safePrice <= 0
          ? "Masukkan harga hartanah sasaran"
          : monthlyInstallment <= maxDsrCapacity
            ? "Layak dalam had 60% DSR"
            : "Melebihi had DSR, laras deposit atau tempoh";

    return {
      safePrice,
      safeIncome,
      safeCommit,
      loanAmount,
      monthlyInstallment,
      maxDsrCapacity,
      dsrUsedPct,
      statusLabel,
    };
  }, [priceText, depositPct, tenureYears, incomeText, commitText]);

  const loanWhatsappHref = useMemo(() => {
    const msg = `Hai Afif, saya telah membuat semakan awal di NextProp4U:\n- Harga Sasaran: ${formatRm(calc.safePrice)}\n- Pinjaman (${100 - depositPct}%, ${tenureYears} thn): ${formatRm(calc.loanAmount)}\n- Anggaran Ansuran: ${formatRm(calc.monthlyInstallment)} / bln\n- Pendapatan Bersih: ${formatRm(calc.safeIncome)} (Komitmen ${formatRm(calc.safeCommit)})\nSaya ingin semakan lanjut kelayakan bank & senarai unit di KL/Selangor.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [calc, depositPct, tenureYears]);

  const mandateWhatsappHref = useMemo(() => {
    const cleanVal = targetValue.trim() ? `RM ${targetValue.trim()}` : "Belum ditetapkan";
    const msg = `Hai Afif, saya ingin berbincang urusan hartanah:\n- Urusan: ${intent}\n- Kawasan: ${area}\n- Jenis: ${propType}\n- Nilai / Bajet Sasaran: ${cleanVal}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [intent, area, propType, targetValue]);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % DESK_MODES.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + DESK_MODES.length) % DESK_MODES.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = DESK_MODES.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const nextMode = DESK_MODES[nextIdx];
      setMode(nextMode);
      modeRefs.current[nextMode]?.focus();
    }
  };

  return (
    <section
      id="kalkulator"
      className="studio-section--paper2 studio-section"
      aria-labelledby="heading-kalkulator"
    >
      <div className="container">
        <div className="workbench-grid">
          {/* Left column: clear advisory parameters */}
          <div data-reveal>
            <h2
              id="heading-kalkulator"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-section)",
                lineHeight: 1.04,
                letterSpacing: "var(--tracking-display)",
                color: "var(--color-ink)",
                fontWeight: 400,
              }}
            >
              Kalkulator DSR &amp; Semakan Nilai KL &amp; Selangor
            </h2>
            <p className="lead mt-4 text-[var(--color-ink-2)]">
              Kira had pinjaman bank sebelum meninjau kediaman di Setapak, Kuala Lumpur dan Selangor.
            </p>

            <ul className="dossier-list mt-8">
              <li className="flex justify-between gap-4">
                <span>Nisbah DSR bank</span>
                <span className="tabular-nums font-medium">60% pendapatan</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Kadar indikatif</span>
                <span className="tabular-nums font-medium">4.15% setahun</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Semakan kelayakan</span>
                <span className="tabular-nums font-medium">Percuma</span>
              </li>
            </ul>
          </div>

          {/* Right column: tactile single-sheet studio workbench */}
          <div className="sheet workbench-sheet" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div className="seg-bar" role="tablist" aria-label="Mod semakan hartanah">
              <button
                ref={(el) => {
                  modeRefs.current.kelayakan = el;
                }}
                id="workbench-tab-kelayakan"
                type="button"
                role="tab"
                aria-selected={mode === "kelayakan"}
                aria-controls="workbench-panel"
                tabIndex={mode === "kelayakan" ? 0 : -1}
                className="seg-btn whitespace-nowrap"
                onClick={() => setMode("kelayakan")}
                onKeyDown={(e) => handleTabKeyDown(e, 0)}
              >
                Kalkulator DSR
              </button>
              <button
                ref={(el) => {
                  modeRefs.current.mandat = el;
                }}
                id="workbench-tab-mandat"
                type="button"
                role="tab"
                aria-selected={mode === "mandat"}
                aria-controls="workbench-panel"
                tabIndex={mode === "mandat" ? 0 : -1}
                className="seg-btn whitespace-nowrap"
                onClick={() => setMode("mandat")}
                onKeyDown={(e) => handleTabKeyDown(e, 1)}
              >
                Semak Nilai
              </button>
            </div>

            <div
              id="workbench-panel"
              role="tabpanel"
              aria-labelledby={`workbench-tab-${mode}`}
            >
              {mode === "kelayakan" ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field-group">
                      <label htmlFor="calc-price" className="field-label">
                        Harga Hartanah (RM)
                      </label>
                      <input
                        id="calc-price"
                        type="text"
                        inputMode="numeric"
                        value={priceText}
                        onChange={(e) => setPriceText(e.target.value.replace(/[^\d]/g, ""))}
                        className="studio-input tabular-nums"
                        placeholder="480000"
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="calc-income" className="field-label">
                        Pendapatan Bersih Bulanan (RM)
                      </label>
                      <input
                        id="calc-income"
                        type="text"
                        inputMode="numeric"
                        value={incomeText}
                        onChange={(e) => setIncomeText(e.target.value.replace(/[^\d]/g, ""))}
                        className="studio-input tabular-nums"
                        placeholder="6500"
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="calc-commit" className="field-label">
                        Komitmen Bulanan Lain (RM)
                      </label>
                      <input
                        id="calc-commit"
                        type="text"
                        inputMode="numeric"
                        value={commitText}
                        onChange={(e) => setCommitText(e.target.value.replace(/[^\d]/g, ""))}
                        className="studio-input tabular-nums"
                        placeholder="1200"
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="calc-tenure" className="field-label">
                        Tempoh &amp; Deposit
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          id="calc-tenure"
                          aria-label="Tempoh pinjaman"
                          value={tenureYears}
                          onChange={(e) => setTenureYears(Number(e.target.value))}
                          className="studio-input"
                        >
                          <option value={25}>25 tahun</option>
                          <option value={30}>30 tahun</option>
                          <option value={35}>35 tahun</option>
                        </select>
                        <select
                          aria-label="Peratus deposit"
                          value={depositPct}
                          onChange={(e) => setDepositPct(Number(e.target.value))}
                          className="studio-input"
                        >
                          <option value={0}>0% dep.</option>
                          <option value={5}>5% dep.</option>
                          <option value={10}>10% dep.</option>
                          <option value={20}>20% dep.</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="estimator-readout" aria-live="polite">
                    <div>
                      <span className="text-xs text-[var(--color-muted)]">
                        Anggaran ansuran bulanan
                      </span>
                      <strong className="estimator-figure">
                        {formatRm(calc.monthlyInstallment)}
                      </strong>
                      <p className="text-xs text-[var(--color-ink-2)] m-0">
                        Jumlah pinjaman {formatRm(calc.loanAmount)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-[var(--color-muted)]">
                        Ruang DSR tersedia (60%)
                      </span>
                      <strong className="estimator-figure">
                        {formatRm(calc.maxDsrCapacity)}
                      </strong>
                      <p className="text-xs text-[var(--color-ink-2)] m-0">
                        {calc.statusLabel} ({calc.dsrUsedPct.toFixed(0)}% nisbah hutang)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <a href={loanWhatsappHref} className="btn btn--primary whitespace-nowrap">
                      Semak Melalui WhatsApp
                    </a>
                    <p className="text-xs text-[var(--color-muted)] max-w-[30ch] m-0">
                      Kiraan indikatif tertakluk penilaian panel bank.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field-group">
                      <label htmlFor="inq-intent" className="field-label">
                        Tujuan Urusan
                      </label>
                      <select
                        id="inq-intent"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        className="studio-input"
                      >
                        <option value="Jual Hartanah">Jual Hartanah</option>
                        <option value="Beli Rumah">Beli Rumah</option>
                        <option value="Sewa Rumah">Sewa Rumah</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label htmlFor="inq-area" className="field-label">
                        Kawasan Pilihan
                      </label>
                      <select
                        id="inq-area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="studio-input"
                      >
                        <option value="Setapak & Wangsa Maju, KL">Setapak &amp; Wangsa Maju, KL</option>
                        <option value="Pusat Bandar & Daerah KL">Kuala Lumpur (Umum)</option>
                        <option value="Petaling Jaya, Subang & Damansara">Petaling Jaya, Subang &amp; Damansara</option>
                        <option value="Ampang, Cheras, Kajang & Bangi">Ampang, Cheras, Kajang &amp; Bangi</option>
                        <option value="Gombak, Selayang & Rawang">Gombak, Selayang &amp; Rawang</option>
                        <option value="Shah Alam, Puchong & Klang">Shah Alam, Puchong &amp; Klang</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label htmlFor="inq-type" className="field-label">
                        Jenis Hartanah
                      </label>
                      <select
                        id="inq-type"
                        value={propType}
                        onChange={(e) => setPropType(e.target.value)}
                        className="studio-input"
                      >
                        <option value="Teres Dua Tingkat">Teres Dua Tingkat</option>
                        <option value="Semi-D / Banglo">Semi-D / Banglo</option>
                        <option value="Pangsapuri / Kondominium">Pangsapuri / Kondominium</option>
                        <option value="Kedai / Komersial">Kedai / Komersial</option>
                      </select>
                    </div>

                    <div className="field-group">
                      <label htmlFor="inq-val" className="field-label">
                        Harga / Kadar Sewa Sasaran (RM)
                      </label>
                      <input
                        id="inq-val"
                        type="text"
                        inputMode="numeric"
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                        className="studio-input tabular-nums"
                        placeholder="cth. 550000"
                      />
                    </div>
                  </div>

                  <div className="estimator-readout">
                    <div>
                      <span className="text-xs text-[var(--color-muted)]">Ringkasan saluran</span>
                      <strong className="estimator-figure">{intent}</strong>
                      <p className="text-xs text-[var(--color-ink-2)] m-0">
                        {propType}, {area}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-[var(--color-muted)]">Nilai sasaran</span>
                      <strong className="estimator-figure">
                        {targetValue ? `RM ${targetValue}` : "Perbincangan"}
                      </strong>
                      <p className="text-xs text-[var(--color-ink-2)] m-0">
                        Maklum balas Muhammad Norafif dalam 24 jam
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <a href={mandateWhatsappHref} className="btn btn--primary whitespace-nowrap">
                      Hantar ke WhatsApp Afif
                    </a>
                    <p className="text-xs text-[var(--color-muted)] max-w-[34ch] m-0">
                      Butiran diisi automatik ke mesej WhatsApp tanpa pendaftaran akaun.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
