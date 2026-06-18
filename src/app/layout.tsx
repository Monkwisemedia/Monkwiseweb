import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monkwisemedia.com"),
  title: {
    default: "Monk Wise Media | Social Media Marketing & Performance Agency",
    template: "%s | Monk Wise Media",
  },
  description:
    "Monk Wise Media is a full-stack social media marketing agency helping D2C brands grow through content creation, paid advertising on Meta, Google, JioHotstar & ChatGPT Ads, social media management, brand strategy, and website development.",
  keywords: [
    "social media marketing agency",
    "D2C brand management",
    "Meta ads agency",
    "Google ads agency",
    "JioHotstar advertising",
    "ChatGPT ads",
    "content creation agency",
    "performance marketing India",
    "website development agency",
  ],
  authors: [{ name: "Monk Wise Media" }],
  openGraph: {
    title: "Monk Wise Media | Social Media Marketing & Performance Agency",
    description:
      "Content, performance ads, and brand growth for D2C brands. Rooted in strategy, built for growth.",
    url: "https://monkwisemedia.com",
    siteName: "Monk Wise Media",
    images: [{ url: "/images/logo.png", width: 1200, height: 1200 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monk Wise Media | Social Media Marketing & Performance Agency",
    description:
      "Content, performance ads, and brand growth for D2C brands. Rooted in strategy, built for growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: "Monk Wise Media",
  description:
    "Full-stack social media marketing agency offering content creation, paid advertising, social media management, D2C brand management, and website development.",
  url: "https://monkwisemedia.com",
  logo: "https://monkwisemedia.com/images/logo.png",
  areaServed: "IN",
  serviceType: [
    "Content Creation",
    "Paid Advertising",
    "Social Media Marketing",
    "D2C Brand Management",
    "Website Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg font-body">{children}</body>
    </html>
  );
}
