"use client";

import { useRef, useState } from "react";

type ServiceId = "jual" | "beli" | "sewa";

const SERVICE_KEYS: ServiceId[] = ["jual", "beli", "sewa"];

const SERVICES: Record<
  ServiceId,
  {
    label: string;
    title: string;
    summary: string;
    checklist: string[];
    image: string;
    width: number;
    height: number;
    alt: string;
    ctaLabel: string;
    whatsappMessage: string;
  }
> = {
  jual: {
    label: "Jual Hartanah",
    title: "Pemasaran & jualan unit pemilik tanpa bayaran iklan pendahuluan",
    summary:
      "Pengurusan penuh dari semakan harga pasaran hingga selesai Perjanjian Jual Beli (S&P / SPA) tanpa sebarang caj pemasaran pendahuluan.",
    checklist: [
      "Semakan nilai pasaran JPPH dan penilai bank panel sebelum harga iklan ditetapkan",
      "Saringan kelayakan DSR pembeli sebelum setiap sesi lawatan tapak dijalankan",
      "Penyelarasan Perjanjian Jual Beli (S&P / SPA) bersama barisan peguam panel",
      "Fee agensi standard 3.24% (termasuk SST) hanya layak selepas jualan berjaya",
    ],
    image: "/images/mandate-keys-floorplan.jpg",
    width: 2400,
    height: 1792,
    alt: "Pelan lantai kediaman bersama kunci rumah dan dokumen urusan",
    ctaLabel: "Semak Nilai Hartanah",
    whatsappMessage:
      "Hai Afif, saya bercadang untuk menjual hartanah di KL/Selangor dan ingin mendapatkan semakan nilai pasaran JPPH.",
  },
  beli: {
    label: "Beli Rumah",
    title: "Carian rumah KL & Selangor secara percuma untuk pembeli sub-sale",
    summary:
      "Khidmat carian rumah, semakan kelayakan pinjaman bank dan rundingan S&P / SPA percuma untuk pembeli sub-sale.",
    checklist: [
      "Kiraan had pinjaman bank (DSR 60%) berpandukan slip gaji 3 bulan sebelum viewing",
      "Tiada sebarang fee ejen kepada pembeli unit sub-sale (komisen ditanggung penjual)",
      "Akses unit sub-sale, pembiayaan LPPSA atau bank serta semakan duti setem pembeli rumah pertama",
      "Pengendalian surat tawaran rasmi dan dokumen urusan di bawah agensi Maxxan Realty",
    ],
    image: "/images/klang-courtyard-living.jpg",
    width: 2400,
    height: 1792,
    alt: "Ruang tamu kediaman moden bertanah di kawasan Lembah Klang",
    ctaLabel: "Cari Unit Pilihan",
    whatsappMessage:
      "Hai Afif, saya sedang mencari rumah untuk dibeli di KL/Selangor dan ingin menyemak senarai unit serta kelayakan bank.",
  },
  sewa: {
    label: "Sewa Rumah",
    title: "Saringan penyewa, dokumen kelayakan & perjanjian rasmi LHDN",
    summary:
      "Padanan penyewa berkelayakan untuk pemilik sekitar Setapak, KL dan Selangor lengkap perjanjian bertempoh sah.",
    checklist: [
      "Saringan profil pekerjaan serta penyata 3 bulan slip gaji bakal penyewa",
      "Penyediaan Tenancy Agreement lengkap berserta urusan stamping rasmi LHDN",
      "Rekod inventori keadaan unit dan serahan kunci secara bertulis",
      "Caj standard 1 bulan sewa bagi tempoh penyewaan setahun",
    ],
    image: "/images/shah-alam-condo-interior.jpg",
    width: 2400,
    height: 1792,
    alt: "Ruang tamu dan balkoni kondominium moden di Kuala Lumpur dan Selangor",
    ctaLabel: "Urus Sewaan Sekarang",
    whatsappMessage:
      "Hai Afif, saya memerlukan khidmat pengurusan sewa rumah di kawasan KL atau Selangor.",
  },
};

export function ServiceSwitcher() {
  const [active, setActive] = useState<ServiceId>("jual");
  const tabRefs = useRef<Partial<Record<ServiceId, HTMLButtonElement | null>>>({});
  const current = SERVICES[active];
  const whatsappUrl = `https://wa.me/601158683907?text=${encodeURIComponent(current.whatsappMessage)}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % SERVICE_KEYS.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + SERVICE_KEYS.length) % SERVICE_KEYS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = SERVICE_KEYS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const nextKey = SERVICE_KEYS[nextIdx];
      setActive(nextKey);
      tabRefs.current[nextKey]?.focus();
    }
  };

  return (
    <section
      id="servis"
      className="studio-section section-rule-top"
      aria-labelledby="heading-khidmat"
    >
      <div className="container">
        <div className="section-head-split" data-reveal>
          <h2 id="heading-khidmat">Jual, Beli &amp; Sewa di Bawah Maxxan Realty</h2>
          <p className="lead">
            Aliran kerja berdaftar Maxxan Realty untuk pemilik rumah, khidmat percuma pembeli sub-sale serta perjanjian sewaan rasmi.
          </p>
        </div>

        <div data-reveal style={{ "--i": 1 } as React.CSSProperties}>
          <div className="seg-bar" role="tablist" aria-label="Pilih skop khidmat hartanah">
            {SERVICE_KEYS.map((id, idx) => (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[id] = el;
                }}
                id={`service-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={active === id}
                aria-controls="service-tabpanel"
                tabIndex={active === id ? 0 : -1}
                className="seg-btn whitespace-nowrap"
                onClick={() => setActive(id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                {SERVICES[id].label}
              </button>
            ))}
          </div>

          <div
            id="service-tabpanel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
            className="sheet dossier-panel"
          >
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-display text-[var(--text-2xl)] text-[var(--color-ink)] leading-[1.12]">
                  {current.title}
                </h3>
                <p className="mt-3 text-base text-[var(--color-ink-2)] max-w-[54ch]">
                  {current.summary}
                </p>

                <ul className="dossier-list">
                  {current.checklist.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <a href={whatsappUrl} className="btn btn--primary">
                  {current.ctaLabel}
                </a>
              </div>
            </div>

            <div className="dossier-plate-wrap">
              <div className="">
                <figure
                  className="dossier-plate"
                  data-slot="service"
                  data-alt={current.alt}
                >
                  <img
                    src={current.image}
                    width={current.width}
                    height={current.height}
                    alt={current.alt}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
