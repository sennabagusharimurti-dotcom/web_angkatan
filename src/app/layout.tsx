import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

import { defineMetadata } from '@/lib/metadata'

import Footer from '@/components/organisms/layout/Footer'
import Navbar from '@/components/organisms/layout/Navbar'

import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})

const rubikone = localFont({
  src: '../assets/fonts/rubik-one/RubikOne-Regular.ttf',
  variable: '--font-rubikone-local',
  display: 'swap'
})

export const metadata: Metadata = defineMetadata()

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${rubikone.variable} h-full antialiased`}>
      <head>
        <link rel="icon" type="image/png" href="/assets/images/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/assets/images/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Evastra" />
        <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
