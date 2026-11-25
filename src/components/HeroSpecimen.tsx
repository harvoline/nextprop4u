"use client";

import { useEffect, useRef, useState } from "react";

interface SpecimenMetrics {
  ascY: number;
  capY: number;
  xY: number;
  baseY: number;
  descY: number;
  ascUnits: number;
  capUnits: number;
  xUnits: number;
  descUnits: number;
  spaceX: number;
  spaceMidLocalY: number;
  spaceUnits: number;
  xboxPx: number;
  pointerX: number | null;
  pointerUnits: number | null;
  fontSizePx: number;
}

export function HeroSpecimen({
  generalWhatsappUrl,
}: {
  generalWhatsappUrl: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [m, setM] = useState<SpecimenMetrics>({
    ascY: 32,
    capY: 40,
    xY: 56,
    baseY: 98,
    descY: 120,
    ascUnits: 805,
    capUnits: 702,
    xUnits: 525,
    descUnits: 254,
    spaceX: 430,
    spaceMidLocalY: 44,
    spaceUnits: 288,
    xboxPx: 30,
    pointerX: null,
    pointerUnits: null,
    fontSizePx: 92,
  });

  useEffect(() => {
    const measure = () => {
      if (!wordRef.current) return;
      const r = wordRef.current.getBoundingClientRect();
      const frameTop = frameRef.current
        ? frameRef.current.getBoundingClientRect().top
        : r.top;
      const topOff = Math.max(0, r.top - frameTop);
      const cs = getComputedStyle(wordRef.current);
      const fs = parseFloat(cs.fontSize) || 92;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const mCap = ctx.measureText("M");
      const mAsc = ctx.measureText("f");
      const mX = ctx.measureText("x");
      const mDesc = ctx.measureText("p");
      const wFirst = ctx.measureText("Muhammad").width;
      const wWithSpace = ctx.measureText("Muhammad ").width;

      const fontAsc = mCap.fontBoundingBoxAscent || fs * 0.86;
      const fontDesc = mCap.fontBoundingBoxDescent || fs * 0.22;
      const baseLocal = r.height * 0.5 + (fontAsc - fontDesc) * 0.5;

      const capPx = mCap.actualBoundingBoxAscent || fs * 0.7;
      const ascPx = Math.max(capPx + 3, mAsc.actualBoundingBoxAscent || fs * 0.8);
      const xPx = mX.actualBoundingBoxAscent || fs * 0.525;
      const descPx = mDesc.actualBoundingBoxDescent || fs * 0.254;
      let spaceCenterPx = Math.round(wFirst + (wWithSpace - wFirst) * 0.5);
      let spaceGapPx = Math.max(10, wWithSpace - wFirst);

      // Measure real DOM inter-word gap between "Muhammad" and "Norafif"
      const textNode = wordRef.current.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        try {
          const rg1 = document.createRange();
          rg1.setStart(textNode, 0);
          rg1.setEnd(textNode, 8);
          const rg2 = document.createRange();
          rg2.setStart(textNode, 9);
          rg2.setEnd(textNode, 16);
          const r1 = rg1.getBoundingClientRect();
          const r2 = rg2.getBoundingClientRect();
          const gap = r2.left - r1.right;
          if (gap > 4) {
            spaceGapPx = gap;
            spaceCenterPx = Math.round(r1.right - r.left + gap * 0.5);
          }
        } catch {}
      }

      const toUnits = (px: number) => Math.round((px / fs) * 1000);
      const xboxSize = Math.round(Math.min(32, Math.max(16, xPx * 0.68)) / 4) * 4;

      setM((prev) => ({
        ...prev,
        ascY: Math.round(topOff + baseLocal - ascPx),
        capY: Math.round(topOff + baseLocal - capPx),
        xY: Math.round(topOff + baseLocal - xPx),
        baseY: Math.round(topOff + baseLocal),
        descY: Math.round(topOff + baseLocal + descPx),
        ascUnits: toUnits(ascPx),
        capUnits: toUnits(capPx),
        xUnits: toUnits(xPx),
        descUnits: toUnits(descPx),
        spaceX: spaceCenterPx,
        spaceMidLocalY: Math.round(baseLocal - xPx * 0.5),
        spaceUnits: toUnits(spaceGapPx),
        xboxPx: xboxSize,
        fontSizePx: fs,
      }));
    };

    measure();
    window.addEventListener("resize", measure);
    const ro =
      typeof ResizeObserver !== "undefined" && wordRef.current
        ? new ResizeObserver(measure)
        : null;
    if (ro && wordRef.current) ro.observe(wordRef.current);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!wordRef.current) return;
    const r = wordRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
    const units = Math.round((x / (m.fontSizePx || 92)) * 1000);
    setM((prev) => ({ ...prev, pointerX: Math.round(x), pointerUnits: units }));
  };

  return (
    <section className="hero-section studio-proof studio-proof--fade">
      <div className="container">
        {/* Studio Construction Specimen Bar matching Studio editorial blueprint anatomy */}
        <div className="specimen-stage">
          <div className="specimen-meta-bar">
            <span>Portofolio Rasmi</span>
            <span className="specimen-meta-mid">Hedvig Letters Serif, unit per 1000</span>
            <span className="specimen-meta-mobile-font">Hedvig Letters Serif</span>
            <span className="specimen-meta-desktop">
              {m.pointerUnits !== null
                ? `Angkup X +${m.pointerUnits} u`
                : "Tuding aksara untuk ukur"}
            </span>
          </div>

          <div
            className="specimen-row"
            style={{ "--xbox-sz": `${m.xboxPx}px` } as React.CSSProperties}
            onPointerMove={handlePointerMove}
            onPointerLeave={() =>
              setM((prev) => ({ ...prev, pointerX: null, pointerUnits: null }))
            }
          >
            {/* Left registration target crosshair */}
            <div className="reg-target" aria-hidden="true" />

            {/* Outer horizontal scale frame + centered 1x*1x square clear-space box */}
            <div ref={frameRef} className="specimen-track">
              {/* 5 Real Typographic Guides spanning the full horizontal rule track */}
              <div className="guide-line guide-line--asc" style={{ top: `${m.ascY}px` }} aria-hidden="true" />
              <div className="guide-line guide-line--cap" style={{ top: `${m.capY}px` }} aria-hidden="true" />
              <div className="guide-line guide-line--x" style={{ top: `${m.xY}px` }} aria-hidden="true" />
              <div className="guide-line guide-line--base" style={{ top: `${m.baseY}px` }} aria-hidden="true" />
              <div className="guide-line guide-line--desc" style={{ top: `${m.descY}px` }} aria-hidden="true" />

              <div className="specimen-frame">
                {/* 4 Square x clear-space boxes extending cleanly above Ascender & below Basal */}
                <div className="xbox xbox--tl" aria-hidden="true">x</div>
                <div className="xbox xbox--tr" aria-hidden="true">x</div>
                <div className="xbox xbox--bl" aria-hidden="true">x</div>
                <div className="xbox xbox--br" aria-hidden="true">x</div>

                <div className="specimen-word-wrap">
                  <div className="specimen-word-inner">
                    {/* Resting inter-word caliper centered cleanly at mid x-height (zero serif collision) */}
                    <span
                      className="specimen-space-tag"
                      style={{ left: `${m.spaceX}px`, top: `${m.spaceMidLocalY}px` }}
                      aria-hidden="true"
                    >
                      +{m.spaceUnits}
                    </span>

                    {/* Interactive live caliper only shown on pointer hover */}
                    {m.pointerX !== null && (
                      <div
                        className="guide-caliper"
                        style={{ left: `${m.pointerX}px` }}
                        aria-hidden="true"
                      />
                    )}
                    <span ref={wordRef} className="specimen-wordmark">
                      Muhammad Norafif
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right metric scale labels anchored relative to Baseline 0 */}
            <div className="specimen-scale" aria-live="off">
              <span className="scale-lbl" style={{ top: `${Math.max(4, m.ascY - 7)}px` }}>
                Ascender +{m.ascUnits}
              </span>
              <span
                className="scale-lbl"
                style={{ top: `${Math.max(m.ascY + 7, m.capY)}px` }}
              >
                Cap +{m.capUnits}
              </span>
              <span className="scale-lbl" style={{ top: `${m.xY}px` }}>
                x-height +{m.xUnits}
              </span>
              <span className="scale-lbl scale-lbl--base" style={{ top: `${m.baseY}px` }}>
                Basal 0
              </span>
              <span className="scale-lbl" style={{ top: `${m.descY}px` }}>
                Descender -{m.descUnits}
              </span>
            </div>

            {/* Right registration target crosshair */}
            <div className="reg-target" aria-hidden="true" />
          </div>

          {/* Mobile compact metric bar labeling all 5 levels clearly */}
          <div className="specimen-mobile-scale" aria-hidden="true">
            <span>Asc +{m.ascUnits}</span>
            <span>Cap +{m.capUnits}</span>
            <span>x +{m.xUnits}</span>
            <span>Basal 0</span>
            <span>Desc -{m.descUnits}</span>
          </div>
        </div>

        {/* Hero Stage Grid: 4.5 / 7.5 asymmetric monograph split so architectural plate dominates 60%+ viewport height */}
        <div className="stage-grid">
          <div className="stage-copy">
            <div className="stage-copy__main">
              <h1>Urus hartanah Kuala Lumpur dan Selangor.</h1>
              <p className="lead">
                Semakan nilai JPPH, kelayakan pinjaman bank dan guaman penuh.
              </p>
              <div className="stage-actions">
                <a href={generalWhatsappUrl} className="btn btn--primary crop">
                  WhatsApp Afif
                </a>
                <a href="#kalkulator" className="btn btn--quiet crop">
                  Semak kelayakan
                </a>
              </div>
            </div>

            {/* Integrated Principal Identity Row with dedicated outer crop-marked portrait sheet */}
            <div className="principal-inline">
              <div className="principal-portrait-frame crop crop--thumb">
                <div className="principal-portrait">
                  <img
                    src="/images/afif-editorial-portrait.jpg"
                    width={2048}
                    height={2048}
                    alt="Muhammad Norafif, Perunding Hartanah Maxxan Realty"
                  />
                </div>
              </div>
              <div className="principal-meta">
                <div className="principal-name">Muhammad Norafif</div>
                <div className="principal-role">
                  Perunding Hartanah Maxxan Realty, Setapak KL
                </div>
                <div className="principal-areas tabular-nums">
                  Sewa dari RM 700, Jualan hingga RM 2.0M
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Right Architectural Plate Stage: outer .crop sheet avoids [data-slot] overflow:hidden clip */}
          <div className="stage-photo-wrap">
            <div className="stage-photo-sheet crop crop--plate">
              <figure
                className="stage-photo-frame"
                data-slot="hero"
                data-alt="Kediaman sudut moden tropika di Kuala Lumpur dan Selangor"
              >
                <img
                  src="/images/bukit-raja-corner-villa.jpg"
                  width={2048}
                  height={1536}
                  alt="Kediaman sudut dua tingkat moden tropika dengan halaman kolam refleksi di Lembah Klang"
                  style={{ objectPosition: "50% 48%" }}
                  fetchPriority="high"
                />
              </figure>
            </div>
            <div className="ratio-redline" aria-hidden="true">
              <span>4:3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
