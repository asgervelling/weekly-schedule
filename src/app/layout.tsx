import FlexCol from "@/components/FlexCol"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-fill ${inter.className}`}>
        <FlexCol className="justify-center">
          <div className="w-full h-2/3">
            {children}
          </div>
        </FlexCol>
      </body>
    </html>
  )
}
