import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`bg-fill ${inter.className}`}>
        <div className="flex flex-col justify-center w-full h-screen">
          <div className="w-full h-2/3">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
