import type { Metadata } from "next";
import { inter } from './font'
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";



// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Market Express Sandaga",
  description: "Faites vous achat au marché sandaga de douala",
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
          <main className="md:max-w-7xl mx-auto bg-white p-4 h-full ">
            <Header />
            {children}
            <Footer />
          </main>
          {/* <Toaster position="bottom-right" />
          <Toaster richColors /> */}
          <Toaster
            position="bottom-center"
            reverseOrder={false}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
