import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nextprop4u.com"),
  title: "Ejen Hartanah Setapak, Kuala Lumpur & Selangor | Muhammad Norafif (Maxxan Realty)",
  description:
    "Perunding Berdaftar Maxxan Realty di Setapak, Kuala Lumpur & Selangor. Khidmat jual, beli dan sewa rumah sub-sale, semakan nilai pasaran JPPH dan kelayakan pinjaman DSR percuma.",
  keywords: [
    "ejen hartanah setapak",
    "perunding hartanah setapak",
    "ejen hartanah wangsa maju",
    "perunding hartanah kuala lumpur",
    "ejen hartanah selangor",
    "jual rumah setapak wangsa maju",
    "rumah sewa setapak",
    "ejen hartanah petaling jaya",
    "ejen hartanah rawang",
    "ejen hartanah gombak",
    "semak kelayakan pinjaman perumahan",
    "dsr calculator malaysia",
    "ejen hartanah maxxan realty",
    "muhammad norafif maxxan realty",
    "beli rumah subsale kl selangor",
  ],
  authors: [{ name: "Muhammad Norafif" }],
  alternates: {
    canonical: "https://nextprop4u.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ejen Hartanah Setapak, Kuala Lumpur & Selangor | Muhammad Norafif (Maxxan Realty)",
    description:
      "Perunding Berdaftar Maxxan Realty. Konsultasi percuma semakan nilai pasaran JPPH dan had kelayakan pinjaman bank (DSR) di KL & Selangor. WhatsApp +6011-5868 3907.",
    url: "https://nextprop4u.com",
    siteName: "NextProp4U - Muhammad Norafif (Maxxan Realty)",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Norafif - Perunding Berdaftar Maxxan Realty | NextProp4U (+6011-5868 3907)",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ejen Hartanah Setapak, Kuala Lumpur & Selangor | Muhammad Norafif (Maxxan Realty)",
    description:
      "Perunding Berdaftar Maxxan Realty berpangkalan di Setapak, KL. Khidmat jual, beli dan sewa rumah seluruh KL & Selangor. Hubungi +6011-5868 3907.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Geist:wght@400;500&family=Sofia+Sans+Extra+Condensed:wght@500&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://nextprop4u.com/#website",
                  "url": "https://nextprop4u.com",
                  "name": "NextProp4U",
                  "description": "Perunding Berdaftar Maxxan Realty di Setapak, Kuala Lumpur & Selangor",
                  "inLanguage": "ms-MY",
                },
                {
                  "@type": ["RealEstateAgent", "LocalBusiness"],
                  "@id": "https://nextprop4u.com/#business",
                  "name": "NextProp4U - Muhammad Norafif (Maxxan Realty)",
                  "url": "https://nextprop4u.com",
                  "image": "https://nextprop4u.com/images/please_follow_my_picture_and_3de36cdc_2K.jpg",
                  "telephone": "+601158683907",
                  "priceRange": "RM 700 - RM 2,000,000",
                  "currenciesAccepted": "MYR",
                  "paymentAccepted": "Cash, Bank Transfer, Housing Loan",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Setapak",
                    "addressLocality": "Setapak",
                    "addressRegion": "Kuala Lumpur",
                    "postalCode": "53300",
                    "addressCountry": "MY",
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 3.1931,
                    "longitude": 101.7068,
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                      "opens": "08:00",
                      "closes": "22:00",
                    },
                  ],
                  "areaServed": [
                    { "@type": "AdministrativeArea", "name": "Setapak, Kuala Lumpur" },
                    { "@type": "AdministrativeArea", "name": "Wangsa Maju, Kuala Lumpur" },
                    { "@type": "AdministrativeArea", "name": "Kuala Lumpur" },
                    { "@type": "AdministrativeArea", "name": "Selangor" },
                    { "@type": "AdministrativeArea", "name": "Petaling Jaya" },
                    { "@type": "AdministrativeArea", "name": "Subang Jaya" },
                    { "@type": "AdministrativeArea", "name": "Gombak" },
                    { "@type": "AdministrativeArea", "name": "Rawang" },
                    { "@type": "AdministrativeArea", "name": "Ampang" },
                  ],
                  "makesOffer": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Jual Hartanah & Rumah Subsale",
                        "description": "Pengurusan jualan hartanah di Kuala Lumpur dan Selangor tanpa sebarang caj pemasaran pendahuluan sehingga selesai Perjanjian Jual Beli (S&P / SPA).",
                      },
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Carian & Beli Rumah Subsale",
                        "description": "Khidmat carian rumah, semakan kelayakan pinjaman bank dan rundingan S&P / SPA percuma untuk pembeli rumah sub-sale.",
                      },
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Khidmat Sewa Rumah & Pengurusan Penyewa",
                        "description": "Saringan profil penyewa, penyediaan Tenancy Agreement dan urusan stamping LHDN lengkap.",
                      },
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Semakan Kelayakan Pinjaman (DSR) & Nilai Pasaran JPPH",
                        "description": "Kiraan had kelayakan pinjaman perumahan bank dan rujukan nilai pasaran hartanah terkini.",
                      },
                    },
                  ],
                },
                {
                  "@type": "Person",
                  "@id": "https://nextprop4u.com/#person",
                  "name": "Muhammad Norafif",
                  "jobTitle": "Perunding Hartanah (Real Estate Negotiator)",
                  "worksFor": {
                    "@type": "RealEstateAgent",
                    "name": "Maxxan Realty Sdn Bhd",
                    "url": "https://maxxan.com.my",
                  },
                  "image": "https://nextprop4u.com/images/please_follow_my_picture_and_3de36cdc_2K.jpg",
                  "telephone": "+601158683907",
                  "url": "https://nextprop4u.com",
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://nextprop4u.com/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Adakah pembeli rumah sub-sale perlu membayar fee ejen?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Percuma untuk pembeli sub-sale. Semakan kelayakan DSR, viewing unit dan rundingan Perjanjian Jual Beli (S&P / SPA) tidak dikenakan caj kerana fee agensi dibayar oleh penjual.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Berapakah fee bagi urusan menjual atau menyewakan unit?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tiada bayaran pendahuluan sebelum transaksi selesai. Fee standard ialah 3.24% (termasuk SST) bagi jualan berjaya, atau satu bulan sewa bagi perjanjian setahun.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Apakah dokumen asas untuk permohonan pinjaman atau sewaan?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sediakan salinan kad pengenalan, slip gaji 3 bulan, penyata bank 3 bulan dan KWSP untuk pinjaman. Sewaan turut melalui saringan penyewa dan stamping rasmi LHDN.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Bagaimana penilaian harga pasaran JPPH dan garis masa berjalan?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Harga disemak menerusi rekod transaksi JPPH dan penilai bank KL serta Selangor. Kelulusan pinjaman bank lazimnya 2 hingga 4 minggu; urusan pindah milik S&P / SPA selesai dalam 3 hingga 5 bulan.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Script id="hallmark-slots" strategy="afterInteractive">
          {`window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector(\`[data-slot="\${k}"]\`); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.querySelectorAll(':scope > img').forEach((o) => o.remove()); s.prepend(im); } };
          document.querySelectorAll('[data-slot] img').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); else i.addEventListener('error', () => i.remove(), { once: true }); });`}
        </Script>
      </body>
    </html>
  );
}
