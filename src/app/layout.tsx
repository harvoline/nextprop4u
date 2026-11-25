import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ejen Hartanah Klang, Meru & Shah Alam | Afif Maxxan Realty",
  description:
    "Khidmat jual, beli & sewa rumah di Klang, Meru, Bandar Bukit Raja & Shah Alam bersama Muhammad Norafif (Maxxan Realty). Semak kelayakan & nilai pasaran percuma!",
  keywords: [
    "ejen hartanah klang",
    "perunding hartanah shah alam",
    "jual rumah meru klang",
    "rumah bandar bukit raja",
    "ejen hartanah maxxan realty",
    "rumah sewa klang",
    "first home buyer klang valley",
  ],
  authors: [{ name: "Muhammad Norafif" }],
  openGraph: {
    title: "Muhammad Norafif | Perunding Hartanah Maxxan Realty (Klang & Shah Alam)",
    description:
      "Konsultasi percuma semakan kelayakan pinjaman & anggaran nilai pasaran rumah di Klang, Meru, Bandar Bukit Raja dan Shah Alam. Hubungi +6011-58683907.",
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
    title: "Ejen Hartanah Klang & Shah Alam | Afif Maxxan Realty",
    description:
      "Khidmat jual, beli & sewa rumah di Klang, Meru, Bukit Raja & Shah Alam. Hubungi +6011-58683907.",
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
                addressLocality: "Klang",
                addressRegion: "Selangor",
                addressCountry: "MY",
              },
              areaServed: ["Klang", "Meru", "Bandar Bukit Raja", "Shah Alam"],
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
