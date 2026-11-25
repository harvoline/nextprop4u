import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perunding Hartanah Kuala Lumpur & Selangor | Afif Maxxan Realty",
  description:
    "Khidmat jual, beli & sewa rumah di Kuala Lumpur & Selangor bersama Muhammad Norafif (Maxxan Realty). Berpangkalan di Setapak, merangkumi seluruh Kuala Lumpur & Selangor.",
  keywords: [
    "perunding hartanah kuala lumpur",
    "perunding hartanah selangor",
    "ejen hartanah setapak",
    "jual rumah kl",
    "ejen hartanah maxxan realty",
    "rumah sewa selangor",
    "first home buyer kl selangor",
  ],
  authors: [{ name: "Muhammad Norafif" }],
  openGraph: {
    title: "Muhammad Norafif | Perunding Hartanah Maxxan Realty (KL & Selangor)",
    description:
      "Konsultasi percuma semakan kelayakan pinjaman & anggaran nilai pasaran rumah di Kuala Lumpur & Selangor. Berpangkalan di Setapak. Hubungi +6011-58683907.",
    url: "https://afif-property.com",
    siteName: "Afif Property — Maxxan Realty",
    images: [
      {
        url: "/afif.jpg",
        width: 400,
        height: 400,
        alt: "Muhammad Norafif — Perunding Hartanah Maxxan Realty",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perunding Hartanah KL & Selangor | Afif Maxxan Realty",
    description:
      "Khidmat jual, beli & sewa rumah di Kuala Lumpur & Selangor. Berpangkalan di Setapak. Hubungi +6011-58683907.",
    images: ["/afif.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Muhammad Norafif — Maxxan Realty",
              image: "/afif.jpg",
              telephone: "+601158683907",
              url: "https://afif-property.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Setapak",
                addressRegion: "Selangor",
                addressCountry: "MY",
              },
              areaServed: ["Kuala Lumpur", "Selangor", "Setapak", "Wangsa Maju", "Ampang", "Petaling Jaya", "Subang Jaya", "Gombak", "Cheras"],
              priceRange: "RM 700 - RM 2,000,000",
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
