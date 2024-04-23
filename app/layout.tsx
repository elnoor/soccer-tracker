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
      <head>
        <meta property="og:image" content={`${process.env.WEBSITE_URL}/api/og`} />
      </head>
      <body className={`${inter.variable} min-h-screen`}>
        <header className="pt-2 pb-4 text-center">
          <Link
            href="/"
            className="bg-gradient-to-br from-black via-[#3E3E3E] to-[#7D7D7D] bg-clip-text font-medium tracking-tight text-transparent text-3xl"
          >
            Soccer Tracker
          </Link>
        </header>
        <main className="mx-auto p-2 flex flex-col items-center justify-center">
          {children}
        </main>
        <footer className="sticky top-[100vh] text-sm text-center pt-2 pb-3 text-gray-500">
          elnoor was{" "}
          <Link
            href="https://github.com/elnoor/soccer-tracker"
            className="underline"
            target="_blank"
          >
            here
          </Link>
        </footer>
      </body>
    </html>
  );
}
