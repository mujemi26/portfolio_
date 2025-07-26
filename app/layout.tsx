import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muhammad Gamal - DevOps Engineer',
  description: 'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation. Portfolio showcasing projects and expertise in AWS, Kubernetes, Docker, and more.',
  generator: 'Next.js',
  authors: [{ name: 'Muhammad Gamal' }],
  keywords: ['DevOps', 'Cloud', 'AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Infrastructure'],
  creator: 'Muhammad Gamal',
  publisher: 'Muhammad Gamal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Muhammad Gamal - DevOps Engineer',
    description: 'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Muhammad Gamal Portfolio',
    images: [
      {
        url: '/og-image.jpg', // You can add this later
        width: 1200,
        height: 630,
        alt: 'Muhammad Gamal - DevOps Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Gamal - DevOps Engineer',
    description: 'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation.',
    images: ['/og-image.jpg'], // You can add this later
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
  icons: {
    icon: [
      { url: '/cloud-favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/cloud-favicon.svg',
    shortcut: '/cloud-favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/cloud-favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/cloud-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/cloud-favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
