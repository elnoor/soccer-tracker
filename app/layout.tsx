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
        <h4 className="pt-3 pb-4 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center font-medium tracking-tight text-transparent text-3xl">
          Soccer Tracker
        </h4>
        <main className="mx-auto p-2 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
