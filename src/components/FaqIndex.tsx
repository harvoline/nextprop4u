const FAQS = [
  {
    q: "Adakah pembeli rumah sub-sale perlu membayar fi ejen?",
    a: "Percuma untuk pembeli sub-sale. Semakan kelayakan DSR, lawatan unit dan rundingan SPA tidak dikenakan caj kerana fi agensi dibayar penjual.",
  },
  {
    q: "Berapakah fi bagi urusan menjual atau menyewakan unit?",
    a: "Tiada bayaran pendahuluan sebelum transaksi selesai. Fi standard ialah 3.24% (termasuk SST) bagi jualan berjaya, atau satu bulan sewa bagi perjanjian setahun.",
  },
  {
    q: "Apakah dokumen asas untuk permohonan pinjaman atau sewaan?",
    a: "Sediakan salinan kad pengenalan, slip gaji 3 bulan, penyata bank 3 bulan dan KWSP untuk pinjaman. Sewaan turut melalui saringan dan mati setem rasmi LHDN.",
  },
  {
    q: "Bagaimana penilaian harga pasaran JPPH dan garis masa berjalan?",
    a: "Harga disemak menerusi rekod transaksi JPPH dan penilai bank KL serta Selangor. Pinjaman lazimnya 2 hingga 4 minggu; pindah milik SPA selesai dalam 3 hingga 5 bulan.",
  },
];

export function FaqIndex({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section id="soalan" className="studio-section" aria-labelledby="heading-soalan">
      <div className="container">
        <div className="faq-layout">
          <div data-reveal>
            <h2
              id="heading-soalan"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-section)", lineHeight: 1.04, letterSpacing: "var(--tracking-display)", color: "var(--color-ink)", fontWeight: 400 }}
            >
              Soalan Lazim LPPEH &amp; Urusan
            </h2>
            <p className="lead mt-4 text-[var(--color-ink-2)]">
              Komisen LPPEH, semakan nilai JPPH dan garis masa transaksi.
            </p>
            <p className="mt-6">
              <a
                href={whatsappUrl}
                className="text-sm font-medium text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4"
              >
                Tanya via WhatsApp
              </a>
            </p>
          </div>

          <div className="faq-list" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item group">
                <summary className="faq-trigger list-none">
                  <span>{item.q}</span>
                  <span className="faq-plus group-open:rotate-45 group-open:text-[var(--color-ink)]" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
