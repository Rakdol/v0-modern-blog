import type { Metadata, Viewport } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'The Void — Premium Tech Blog',
  description:
    'A visually bold editorial blog exploring the frontiers of technology, design, and code.',
}

export const viewport: Viewport = {
  themeColor: '#0a0a14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased noise-bg">
        <div className="mesh-gradient" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
