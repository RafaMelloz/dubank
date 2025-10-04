import { Navbar } from "@/shared/components/navbar";
import { auth } from "@/shared/libs/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex flex-col gap-2 h-dvh mx-auto px-4 py-5 md:px-0 md:container overflow-hidden">
      <section className="flex-1 overflow-y-auto">
        {children}
      </section>
      <Navbar />
    </main>
  );
}
