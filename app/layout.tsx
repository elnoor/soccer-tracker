import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Soccer Tracker",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <main className="relative flex min-h-screen flex-col items-center justify-center">
          <h4 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center font-medium tracking-tight text-transparent text-4xl">
            Soccer Tracker
          </h4>
          {children}
        </main>
      </body>
    </html>
  );
}
