const PILLARS = [
  {
    num: "01",
    title: "Perunding Berdaftar Maxxan Realty",
    desc: "Setiap dokumen penawaran, surat setuju beli dan khidmat rundingan diurus secara profesional di bawah naungan agensi Maxxan Realty Sdn Bhd.",
  },
  {
    num: "02",
    title: "Semakan Nilai Pasaran JPPH",
    desc: "Penetapan harga rujukan menggunakan data transaksi sebenar Jabatan Penilaian dan Perkhidmatan Harta serta semakan penilai bank.",
  },
  {
    num: "03",
    title: "Rangkaian Pembeli & Ejen COA",
    desc: "Listing dipadankan bersama rangkaian pembeli sedia ada dan kerjasama rakan ejen (COA) bagi mempercepatkan proses jualan.",
  },
  {
    num: "04",
    title: "Koordinasi Bank & Peguam",
    desc: "Penyelarasan permohonan pinjaman bank serta urusan Perjanjian Jual Beli (S&P / SPA) hingga serahan kunci selesai.",
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
          <h2 id="heading-pendekatan">Data Pasaran Terkini &amp; Khidmat Maxxan Realty</h2>
          <p className="lead">
            Setiap dokumen tawaran, rujukan nilai hartanah dan khidmat nasihat diurus secara telus di bawah agensi Maxxan Realty.
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
