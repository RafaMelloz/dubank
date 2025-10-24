import { Providers } from "@/shared/providers/theme-provider";
import type { Metadata, Viewport } from "next";
import "./globals.css";

// Define viewport/meta so the PWA opens without the white status bar on mobile
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#a5f3fc" }, // cyan-200
    { media: "(prefers-color-scheme: dark)", color: "#0c4a6e" }, // sky-900
  ],
};

export const metadata: Metadata = {
  title: "DuBank",
  description: "Controle de finanças pessoal",
  manifest: "/manifest.webmanifest",
  // iOS specific behavior when added to Home Screen
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
            {children}
        </Providers>
      </body>
    </html>
  );
}
