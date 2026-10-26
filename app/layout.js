import { Gloock, Jost } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './_components/LanguageProvider'
import LoadingScreen from './_components/LoadingScreen'

const display = Gloock({
  subsets: ['latin'],
  weight: '400',
  variable: '--ff-display',
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
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <LoadingScreen>{children}</LoadingScreen>
        </LanguageProvider>
      </body>
    </html>
  )
}
