import './globals.css'

import { Inter } from 'next/font/google'
 

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-fill ${inter.className}`}>
        <div className='w-[900px]'>
        {children}
        </div>
      </body>
    </html>
  )
}
