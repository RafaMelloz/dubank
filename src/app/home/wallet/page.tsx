import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/shared/libs/better-auth/auth";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";

const prisma = new PrismaClient();

export default async function WalletPage() {
  const router = useRouter();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // 2. Buscar balance DIRETO do banco
  const balance = await prisma.balance.findUnique({
    where: { userId: session!.user.id },
  });

  return (
    <div>
      <h1>Saldo: R$ {balance?.value || 0}</h1>
    </div>
  );
}