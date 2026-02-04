import type { Metadata } from 'next';
import { Inter, Source_Sans_Pro, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSansPro = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans-pro',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Best Cardiovascular Biomarkers — CardioGuard',
  description: 'Get advanced cardiovascular biomarkers like ApoB and Lp(a) without insurance barriers. CardioGuard delivers comprehensive heart testing with expert guidance.',
  keywords: [
    'best cardiovascular biomarkers',
    'apolipoprotein b test',
    'lipoprotein a test',
    'advanced lipid panel',
    'heart disease prevention blood tests',
    'cardiovascular risk testing'
  ],
  authors: [{ name: 'CardioGuard' }],
  creator: 'CardioGuard',
  publisher: 'CardioGuard',
  metadataBase: new URL('https://cardioguard.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'CardioGuard',
    title: 'Best Cardiovascular Biomarkers — CardioGuard',
    description: 'Get advanced cardiovascular biomarkers like ApoB and Lp(a) without insurance barriers. CardioGuard delivers comprehensive heart testing with expert guidance.',
    url: 'https://cardioguard.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cardiovascular Biomarkers — CardioGuard',
    description: 'Get advanced cardiovascular biomarkers like ApoB and Lp(a) without insurance barriers. CardioGuard delivers comprehensive heart testing with expert guidance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token_here',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSansPro.variable} ${jetBrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}