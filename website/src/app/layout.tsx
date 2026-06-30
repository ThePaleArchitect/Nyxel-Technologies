import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'NXC ✦ | Stealth Engineering Collective',
  description: 'Faceless engineering studio. Web2 + Web3. $50 personal projects to $50k enterprise infrastructure.',
  openGraph: {
    title: 'NXC ✦ | Stealth Engineering Collective',
    description: 'Build in stealth. Deploy at scale.',
    url: 'https://nyxeltechnologies.com',
    siteName: 'NXC ✦',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NXC ✦ | Stealth Engineering Collective',
    description: 'Build in stealth. Deploy at scale.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://nyxeltechnologies.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
