import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center h-4/5 w-[13%]">
            {children}
          </div>
        </div>  
      </body>
    </html>
  )
}
