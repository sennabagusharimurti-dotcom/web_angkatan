import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "https://smkn7semarang.sch.id"),
  title: "Evastra - Teknologi Informasi ITS 2025",
  description:
    "EVASTRA merupakan nama angkatan Teknologi Informasi ITS 2025 yang merepresentasikan semangat untuk berkembang bersama, menguatkan karakter, dan meningkatkan kompetensi.",
  keywords:
    "Teknologi Informasi, ITS, 2025, EVASTRA, Angkatan, Pendidikan, it, it its, teknologi informasi its, teknologi informasi its 2025, teknologi informasi its 2025 evastra",
  authors: {
    url: "https://evastra.tech",
    name: "Evastra - Teknologi Informasi ITS 2025",
  },
  openGraph: {
    type: "website",
    title: "Evastra - Teknologi Informasi ITS 2025",
    description:
      "EVASTRA merupakan nama angkatan Teknologi Informasi ITS 2025 yang merepresentasikan semangat untuk berkembang bersama, menguatkan karakter, dan meningkatkan kompetensi.",
    url: "https://evastra.tech",
    images: {
      url: "/assets/images/metadata/og.webp",
      width: 1200,
      height: 630,
      type: "image/webp",
      alt: "Evastra - Teknologi Informasi ITS 2025",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Evastra - Teknologi Informasi ITS 2025",
    description:
      "EVASTRA merupakan nama angkatan Teknologi Informasi ITS 2025 yang merepresentasikan semangat untuk berkembang bersama, menguatkan karakter, dan meningkatkan kompetensi.",
    images: {
      url: "/assets/images/metadata/og.webp",
      width: 1200,
      height: 630,
      type: "image/webp",
      alt: "Evastra - Teknologi Informasi ITS 2025",
    },
  },
  icons: {
    icon: "/assets/images/favicon/android-chrome-192x192.png",
    shortcut: "/assets/images/favicon/android-chrome-512x512.png",
    apple: "/assets/images/favicon/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const defineMetadata = (metadata?: Metadata): Metadata => {
  return {
    ...defaultMetadata,
    ...metadata,
  };
};
