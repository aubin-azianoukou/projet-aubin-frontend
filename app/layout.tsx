import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aubin Romain AZIANOUKOU — Consultant, formateur et auteur",
  description: "Développer les compétences, structurer les entreprises et accompagner la réussite durable au Burkina Faso et en Afrique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className={inter.className} style={{
        fontFamily: "'Inter', 'Poppins', sans-serif",
        backgroundColor: '#f8f5ee',
        color: '#06172f',
        lineHeight: 1.6,
        overflowX: 'hidden',
        width: '100%',
        margin: 0  // ← Plus de padding
      }}>
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}