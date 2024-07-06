import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Header from "@/Components/header/header"
import Footer from "@/Components/footer/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud Hosting Project",
};


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer theme="colored" position="top-center"/>
        <main>
        {children}
        </main>
        <Footer />
        </body>
    </html>
  );
}
