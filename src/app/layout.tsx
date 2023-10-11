import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#FDF5E6]'>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center h-4/5 w-[13%] bg-[#ebe5db]">
            {children}
          </div>
        </div>  
      </body>
    </html>
  )
}
