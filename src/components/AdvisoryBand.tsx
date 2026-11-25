const PILLARS = [
  {
    num: "01",
    title: "Perunding Sah Berdaftar LPPEH",
    desc: "Setiap dokumen penawaran, wang tempahan dan perjanjian rasmi diurus menerusi akaun klien berlesen di bawah Maxxan Realty Sdn Bhd.",
  },
  {
    num: "02",
    title: "Semakan Nilai Pasaran JPPH",
    desc: "Penetapan harga rujukan menggunakan data transaksi sebenar Jabatan Penilaian dan Perkhidmatan Harta serta semakan penilai bank.",
  },
  {
    num: "03",
    title: "Rangkaian Pembeli & Ejen COA",
    desc: "Listing dipadankan bersama pangkalan pembeli sedia ada dan kerjasama rentas agensi bertauliah bagi mempercepat penutupan transaksi.",
  },
  {
    num: "04",
    title: "Koordinasi Bank & Peguam",
    desc: "Penyelarasan dokumen permohonan pinjaman perumahan serta penyediaan draf Perjanjian Jual Beli hingga penyerahan kunci selesai.",
  },
];

export function AdvisoryBand() {
  return (
    <section
      id="pendekatan"
      className="surface-ink studio-section--wide"
      aria-labelledby="heading-pendekatan"
    >
      <div className="container">
        <div className="section-head-split" data-reveal>
          <h2 id="heading-pendekatan">Data Transaksi JPPH &amp; Pematuhan LPPEH</h2>
          <p className="lead">
            Setiap dokumen tawaran, rujukan nilai hartanah dan wang tempahan diurus menerusi akaun klien berlesen Maxxan Realty.
          </p>
        </div>

        <div className="ink-rows">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.num}
              className="ink-row"
              data-reveal
              style={{ "--i": idx } as React.CSSProperties}
            >
              <div className="ink-row__num">{pillar.num}</div>
              <h3 className="ink-row__title">{pillar.title}</h3>
              <p className="ink-row__desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
