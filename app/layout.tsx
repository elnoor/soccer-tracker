import Link from "next/link";
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
      <body className={`${inter.variable} min-h-screen`}>
        <Link href="/">
          <h4 className="pt-3 pb-4 bg-gradient-to-br from-black via-[#3E3E3E] to-[#7D7D7D] bg-clip-text text-center font-medium tracking-tight text-transparent text-3xl">
            Soccer Tracker
          </h4>
        </Link>
        <main className="mx-auto p-2 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
