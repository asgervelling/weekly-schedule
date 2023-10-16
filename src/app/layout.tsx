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
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center text-primary"> {/* Week container */}
            {children}
          </div>
        </div>  
      </body>
    </html>
  )
}
