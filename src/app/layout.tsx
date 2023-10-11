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
          <div className="flex items-center justify-center h-1/4 w-1/2">
            {children}
          </div>
        </div>  
      </body>
    </html>
  )
}
