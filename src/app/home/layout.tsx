import { Navbar } from "@/shared/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-2 h-dvh mx-auto px-4 py-5 md:px-0 md:container overflow-hidden">
      <section className="flex-1 overflow-y-auto">
        {children}
      </section>
      <Navbar />
    </main>
  );
}
