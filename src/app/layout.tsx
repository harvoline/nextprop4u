import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nextprop4u.com"),
  title: "Ejen Hartanah Setapak, Kuala Lumpur & Selangor | Muhammad Norafif, Maxxan Realty",
  description:
    "Khidmat jual, beli dan sewa rumah di Setapak, Kuala Lumpur serta seluruh Selangor bersama Muhammad Norafif (Maxxan Realty). Semakan nilai pasaran JPPH dan kelayakan pinjaman percuma.",
  keywords: [
    "ejen hartanah setapak",
    "perunding hartanah kuala lumpur",
    "ejen hartanah selangor",
    "jual rumah setapak wangsa maju",
    "rumah sewa kuala lumpur",
    "ejen hartanah maxxan realty",
    "beli rumah selangor kuala lumpur",
  ],
  authors: [{ name: "Muhammad Norafif" }],
  openGraph: {
    title: "Muhammad Norafif | Perunding Hartanah Maxxan Realty (KL & Selangor)",
    description:
      "Konsultasi percuma semakan kelayakan pinjaman dan anggaran nilai pasaran hartanah di Kuala Lumpur serta Selangor. Hubungi +6011-5868 3907.",
    url: "https://nextprop4u.com",
    siteName: "NextProp4U, Muhammad Norafif (Maxxan Realty)",
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
    title: "Ejen Hartanah Kuala Lumpur & Selangor | Muhammad Norafif, Maxxan Realty",
    description:
      "Fokus utama di Setapak, KL. Khidmat jual, beli dan sewa rumah seluruh Kuala Lumpur dan Selangor. Hubungi +6011-5868 3907.",
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
              "@type": "RealEstateAgent",
              name: "Muhammad Norafif, Maxxan Realty",
              image: "https://nextprop4u.com/images/please_follow_my_picture_and_3de36cdc_2K.jpg",
              telephone: "+601158683907",
              url: "https://nextprop4u.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Setapak",
                addressRegion: "Kuala Lumpur",
                addressCountry: "MY",
              },
              areaServed: ["Setapak", "Wangsa Maju", "Kuala Lumpur", "Selangor", "Petaling Jaya", "Subang Jaya", "Shah Alam", "Klang"],
              priceRange: "RM 700 - RM 2,000,000",
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
