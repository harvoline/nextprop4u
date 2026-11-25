import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Home,
  Key,
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle2,
  FileCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya lihat website anda. Saya berminat untuk dapatkan konsultasi hartanah di kawasan Klang/Shah Alam."
  )}`;

  const services = [
    {
      title: "Jual Hartanah",
      subtitle: "Untuk Pemilik Rumah (Owners)",
      tag: "Maksimumkan Nilai Jualan",
      description:
        "Bantu pemilik rumah di Klang & Shah Alam pasarkan hartanah pada harga tepat, tapis pembeli berkualiti, dan urus rundingan hingga selesai.",
      features: [
        "Semakan Nilai Pasaran (Market Value) percuma",
        "Pemasaran TikTok, FB Ads, dan portal hartanah",
        "Pra-semakan kelayakan pinjaman pembeli (bank loan screening)",
        "Pengurusan panel peguam & dokumen serahan kunci",
      ],
      ctaText: "WhatsApp: Bincang Jualan Rumah",
      ctaUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hai Afif, saya pemilik rumah di Klang/Shah Alam dan ingin jual hartanah saya. Boleh bantu semak nilai pasaran?"
      )}`,
      icon: TrendingUp,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "Beli Rumah",
      subtitle: "First-Home Buyers & Pelabur",
      tag: "Pilihan Kediaman Bebas Banjir",
      description:
        "Bimbingan lengkap memiliki rumah idaman tanpa risiko permohonan pinjaman ditolak. Kami carikan unit terbaik ikut bajet bulanan anda.",
      features: [
        "Semakan kelayakan loan bank & LPPSA percuma",
        "Senarai rumah subsale & projek baru mampu milik",
        "Panduan skim rumah pertama & pengecualian duti setem",
        "Khidmat rundingan harga & semakan kejiranan",
      ],
      ctaText: "WhatsApp: Semak Kelayakan Loan",
      ctaUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hai Afif, saya sedang mencari rumah di kawasan Klang/Meru/Shah Alam. Boleh bantu semak kelayakan pinjaman percuma?"
      )}`,
      icon: Home,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Sewa Rumah",
      subtitle: "Landlord & Bakal Penyewa",
      tag: "Penyewaan Selamat & Teratur",
      description:
        "Padanan pantas antara pemilik dan penyewa berkualiti. Lengkap dengan tapisan latar belakang dan tenancy agreement sah.",
      features: [
        "Tapisan slip gaji & pengesahan rekod pekerjaan",
        "Penyediaan Tenancy Agreement sah & LHDN stamping",
        "Borang inventori perabot & kondisi asal rumah",
        "Kurangkan risiko rumah kosong berpanjangan",
      ],
      ctaText: "WhatsApp: Urus Sewa Rumah",
      ctaUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hai Afif, saya mencari / ingin sewakan rumah di kawasan Klang/Meru/Shah Alam. Boleh bantu?"
      )}`,
      icon: Key,
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  const faqs = [
    {
      q: "Adakah sebarang caj pendahuluan untuk pemilik yang ingin menjual rumah?",
      a: "Tiada sebarang caj pendahuluan. Segala kos pemasaran dan khidmat konsultasi adalah tanggungan kami. Yuran profesional agensi hartanah standard (mengikut garis panduan LPPEH) hanya ditolak daripada hasil jualan setelah proses jualan dan pindah milik selesai sepenuhnya.",
    },
    {
      q: "Berapa kos servis jika saya ingin membeli rumah melalui Afif?",
      a: "Khidmat semakan kelayakan pinjaman, cadangan senarai rumah, dan rundingan pembelian bagi pihak pembeli subsale adalah PERCUMA. Komisen agensi dibayar sepenuhnya oleh pihak penjual.",
    },
    {
      q: "Berapa lama anggaran masa untuk rumah terjual di Klang / Meru / Shah Alam?",
      a: "Dengan penetapan harga yang tepat mengikut market value JPPH dan pemasaran agresif di TikTok, Reels serta portal hartanah, purata masa mendapatkan pembeli serius biasanya antara 1 hingga 3 bulan.",
    },
    {
      q: "Bagaimana Afif menapis bakal penyewa?",
      a: "Kami melakukan tapisan rapi meliputi pengesahan pekerjaan tetap, slip gaji 3 bulan, dan penyediaan Perjanjian Sewa (Tenancy Agreement) yang dimatikan setem sah LHDN.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">
        <span>🚀 Khidmat Hartanah Berdaftar Maxxan Realty di Klang, Meru, Bukit Raja & Shah Alam. </span>
        <a
          href={generalWhatsappUrl}
          className="underline hover:text-emerald-400 font-bold ml-1 inline-flex items-center gap-1"
        >
          WhatsApp Sekarang &rarr;
        </a>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600 shadow-sm">
              <Image
                src="/afif.jpg"
                alt="Muhammad Norafif"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                Muhammad Norafif
              </div>
              <div className="text-[11px] text-slate-700 font-semibold">
                Perunding Hartanah | Maxxan Realty
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+${whatsappNumber}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+6011-5868 3907</span>
            </a>
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5"
            >
              Portal Ejen
            </Link>
            <a
              href={generalWhatsappUrl}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Perunding Hartanah Berdaftar • Maxxan Realty</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
                Urusan Jual, Beli & Sewa Hartanah{" "}
                <span className="text-emerald-600">Lebih Mudah & Telus</span> di Klang & Shah Alam
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Dari semakan nilai pasaran semasa (market value), tapisan pembeli berkualiti, hinggalah urusan pinjaman bank dan peguam selesai — saya sedia membimbing anda dari A hingga Z tanpa sebarang caj tersembunyi.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
                <a
                  href={generalWhatsappUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 hover:shadow-xl transition transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Afif Sekarang (Percuma)</span>
                </a>
                <a
                  href="#servis"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base border border-slate-200 transition"
                >
                  <span>Lihat Pilihan Servis</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Respon Pantas (WhatsApp)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Semakan Nilai Pasaran Percuma</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bebas Komitmen Awal</span>
                </div>
              </div>
            </div>

            {/* Right Card / Profile Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-slate-200/80">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-500 shadow-md mb-4">
                    <Image
                      src="/afif.jpg"
                      alt="Muhammad Norafif"
                      width={112}
                      height={112}
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">Muhammad Norafif</h3>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                    Real Estate Negotiator
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Maxxan Realty Sdn Bhd
                  </p>

                  <div className="w-full border-t border-slate-100 my-4" />

                  <div className="w-full space-y-2.5 text-left text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-slate-500">Kawasan Utama:</span>
                      <span className="font-semibold text-slate-800">Klang, Meru, Shah Alam</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-slate-500">Agensi:</span>
                      <span className="font-semibold text-slate-800">Maxxan Realty</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-slate-500">Status:</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Aktif Menerima Listing
                      </span>
                    </div>
                  </div>

                  <a
                    href={generalWhatsappUrl}
                    className="w-full mt-5 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi di WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="servis" className="py-16 sm:py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
              Pilihan Khidmat Hartanah
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Penyelesaian Hartanah Menyeluruh & Profesional
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-3">
              Pilih perkhidmatan yang anda perlukan. Kami berikan konsultasi terus dan cadangan terbaik tanpa kerumitan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 p-6 sm:p-7 bg-white hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${svc.badgeColor}`}
                      >
                        {svc.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{svc.title}</h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {svc.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="border-t border-slate-100 pt-4 space-y-2">
                      {svc.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <a
                      href={svc.ctaUrl}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{svc.ctaText}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Kelebihan Bekerjasama
              </h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Kenapa Ramai Memilih Muhammad Norafif di Klang & Shah Alam?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Industri hartanah memerlukan kejujuran, ketelitian data pasaran, serta rangkaian peguam dan pegawai bank yang responsif. Kami memastikan setiap transaksi diuruskan secara profesional dan selamat.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Perunding Sah Berdaftar</h5>
                    <p className="text-xs text-slate-600">
                      Bernaung di bawah Maxxan Realty Sdn Bhd dan mematuhi garis panduan ketat LPPEH.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FileCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Semakan Data Pasaran Rasmi (JPPH)</h5>
                    <p className="text-xs text-slate-600">
                      Penetapan harga rumah bersandarkan data transaksi sebenar, bukan sekadar tekaan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Rangkaian Pembeli & Ejen Luas (COA)</h5>
                    <p className="text-xs text-slate-600">
                      Akses kepada komuniti beribu ejen hartanah dan pembeli sedia ada untuk mempercepatkan proses jualan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                <h4 className="text-lg font-bold text-slate-900">
                  Ingin Semak Nilai Rumah Anda Hari Ini?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sediakan alamat rumah atau nama taman, jenis hartanah, dan saiz anggaran. Kami berikan anggaran nilai pasaran terkini tanpa sebarang komitmen.
                </p>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                  ✓ Tanpa bayaran pendahuluan • ✓ Privasi maklumat dijamin • ✓ Respon dalam tempoh 24 jam
                </div>
                <a
                  href={generalWhatsappUrl}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hantar Detail Rumah di WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
              Soalan Lazim (FAQ)
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Perkara Yang Sering Ditanya
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <h5 className="font-bold text-sm sm:text-base text-slate-900 mb-2">
                  {faq.q}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Compliance Notice */}
      <footer className="mt-auto bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="text-white font-bold text-sm">Muhammad Norafif</div>
              <div className="text-slate-400 text-xs">
                Perunding Hartanah Berdaftar (REN) • Maxxan Realty Sdn Bhd
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={generalWhatsappUrl}
                className="text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                WhatsApp: +6011-5868 3907
              </a>
              <Link href="/login" className="text-slate-400 hover:text-white">
                Log Masuk Dashboard &rarr;
              </Link>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed space-y-2">
            <p>
              <strong>Penafian Pematuhan LPPEH:</strong> Laman ini diuruskan oleh Muhammad Norafif, perunding hartanah berdaftar di bawah Maxxan Realty Sdn Bhd. Semua maklumat hartanah yang dipaparkan adalah tertakluk kepada perubahan dan ketersediaan semasa.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Muhammad Norafif | Maxxan Realty. Hak Cipta Terpelihara.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
