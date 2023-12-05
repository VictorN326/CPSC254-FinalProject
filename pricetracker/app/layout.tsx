import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'PriceTracker',
  description: 'Saving you money, one price drop at a time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='max-w-10xl mx-auto'>
          <Navbar />
          {children}
        </main>
        </body>
    </html>
  )
}
