import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UGate Super Admin - Administration Plateforme",
  description: "Tableau de bord super administrateur pour la gestion globale de la plateforme UGate",
};

/**
 * Layout Principal
 * 
 * Ce layout enveloppe toute l'application avec :
 * - La police Inter
 * - Le AuthProvider pour l'authentification globale
 * - Les styles globaux
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} antialiased`}
      >
        {/* 🔐 AuthProvider enveloppe toute l'application */}
        {/* Tous les composants enfants peuvent maintenant utiliser useAuth() */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
