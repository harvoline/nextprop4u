export function CorridorBento({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section id="koridor" className="studio-section" aria-labelledby="heading-liputan">
      <div className="container">
        <div className="section-head-split" data-reveal>
          <h2 id="heading-liputan">Setapak, Kuala Lumpur dan Seluruh Selangor</h2>
          <p className="lead">
            Fokus utama di Setapak dengan liputan harian merangkumi kawasan sekitar Kuala Lumpur serta Selangor.
          </p>
        </div>

        <div className="bento-grid">
          {/* Lead Bento Cell (7 columns): Setapak, Wangsa Maju & Kuala Lumpur */}
          <article className="sheet bento-lead" data-reveal>
            <div>
              <div className="bento-lead-sheet mb-4">
                <figure
                  className="bento-lead__photo"
                  data-slot="corridor"
                  data-alt="Deretan rumah teres dua tingkat kontemporari dengan fasad konkrit dan skrin kayu"
                >
                  <img
                    src="/images/bukit-raja-terrace-row.jpg"
                    width={2752}
                    height={1536}
                    alt="Deretan rumah teres dua tingkat kontemporari dengan fasad konkrit dan skrin kayu merbau"
                  />
                </figure>
              </div>
              <h3 className="font-display text-[var(--text-title)] text-[var(--color-ink)] leading-[1.15]">
                Setapak, Wangsa Maju &amp; Kuala Lumpur
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)] max-w-[54ch]">
                Fokus utama di Setapak meliputi Danau Kota, Setiawangsa, Melawati, Titiwangsa, Mont Kiara, Bangsar, Cheras dan pusat bandar KL.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-5 border-t border-[var(--color-rule)]">
              <span className="text-sm font-medium text-[var(--color-ink)]">
                Kondominium, Teres &amp; Semi-D
              </span>
              <a
                href={whatsappUrl}
                className="text-sm font-medium text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4"
              >
                Semak nilai kawasan KL
              </a>
            </div>
          </article>

          {/* Right stacked column (5 columns): Selangor West/South Zone + Owner Valuation Prompt */}
          <div className="bento-side">
            <article className="sheet bento-cell" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              <div>
                <h3 className="font-display text-[var(--text-title)] text-[var(--color-ink)] leading-[1.15]">
                  Petaling Jaya, Subang &amp; Damansara
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">
                  Fokus kepada kediaman sub-sale matang, apartmen transit LRT dan perumahan keluarga berhampiran Damansara, Subang Jaya, Bandar Sunway dan Puchong.
                </p>
              </div>
              <div className="pt-3 mt-2 border-t border-[var(--color-rule)] flex items-center justify-between text-xs text-[var(--color-muted)] tabular-nums">
                <span>Sub-sale &amp; Kondominium</span>
                <span>Sewa RM 700 ke atas</span>
              </div>
            </article>

            <article className="sheet bento-cell" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <div>
                <h3 className="font-display text-[var(--text-title)] text-[var(--color-ink)] leading-[1.15]">
                  Aktif Menerima Listing Pemilik
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">
                  Pemilik di KL dan Selangor boleh menyemak nilai pasaran semasa JPPH bagi merancang harga jualan atau kadar sewaan dalam tempoh 24 jam.
                </p>
              </div>
              <div className="pt-3 mt-2 border-t border-[var(--color-rule)] flex items-center justify-between text-xs text-[var(--color-muted)]">
                <span>Maklum balas 24 jam</span>
                <a
                  href="#kalkulator"
                  className="text-[var(--color-ink)] font-medium underline decoration-[var(--color-accent)] underline-offset-4"
                >
                  Semak Nilai Rumah
                </a>
              </div>
            </article>
          </div>

          {/* Bottom 3 asymmetric regional Selangor bands (4 columns each) */}
          <article className="sheet bento-cell bento-bottom-a" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <div>
              <h3 className="font-display text-[var(--text-title)] text-[var(--color-ink)] leading-[1.15]">
                Shah Alam, Klang &amp; Setia Alam
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">
                Unit kediaman teres keluarga, rumah berkembar serta lot sudut di Shah Alam, Setia Alam, Bandar Bukit Raja dan Klang.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-[var(--color-rule)] text-xs text-[var(--color-muted)] tabular-nums">
              Jualan sehingga RM 2.0M
            </div>
          </article>

          <article className="sheet bento-cell bento-bottom-b" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <div>
              <h3 className="font-display text-[var(--text-title)] text-[var(--color-ink)] leading-[1.15]">
                Ampang, Cheras, Kajang &amp; Bangi
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">
                Kediaman pegangan bebas, kondominium transit serta zon perumahan koridor timur dan selatan Lembah Klang.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-[var(--color-rule)] text-xs text-[var(--color-muted)]">
              Pemilik &amp; Pembeli Sub-sale
            </div>
          </article>

          <article className="sheet bento-cell bento-bottom-c" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            <div>
              <h3 className="font-display text-[var(--text-title)] text-[var(--color-ink)] leading-[1.15]">
                Gombak, Selayang &amp; Rawang
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">
                Liputan harian dari Setapak merentasi Batu Caves, Gombak, Kepong, Selayang sehingga ke kawasan utara Selangor.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-[var(--color-rule)] text-xs text-[var(--color-muted)]">
              Fokus Setapak KL
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
