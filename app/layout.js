import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './_components/LanguageProvider'
import LoadingScreen from './_components/LoadingScreen'

const display = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--ff-display',
})

const accent = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--ff-accent',
})

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--ff-sans',
})

export const metadata = {
  title: 'KT Equestrian',
  description: 'Horsetraining and Coaching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${accent.variable} ${sans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <LoadingScreen>{children}</LoadingScreen>
        </LanguageProvider>
      </body>
    </html>
  )
}
