import { Providers } from "@/shared/providers/theme-provider";
import "./globals.css";

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
