import { Cinzel, Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cinzel',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-jost',
})

export const metadata = {
  title: 'KT Equestrian',
  description: 'Horsetraining and Coaching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} font-[var(--font-jost)] antialiased`}>
        {children}
      </body>
    </html>
  )
}
