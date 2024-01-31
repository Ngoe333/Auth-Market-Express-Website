import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <main className="md:max-w-7xl mx-auto bg-[#FCFCFC] p-4 h-full ">
            <Header />
            {children}
            <Footer />
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
