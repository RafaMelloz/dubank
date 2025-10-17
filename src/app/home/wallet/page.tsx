import { PrismaClient } from "@/generated/prisma";
import { auth } from "@/shared/libs/better-auth/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export default async function WalletPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // 2. Buscar balance DIRETO do banco
  const balance = await prisma.balance.findUnique({
    where: { userId: session!.user.id },
  });

  const fixedIncomeForm = await prisma.income.findMany({
    where: { userId: session!.user.id, extra: false },
  });

  return (
    <div>
      <h1>Saldo: R$ {balance?.value || 0}</h1>
      <div>
        <h2>Rendas Fixas:</h2>
        <ul>
          {fixedIncomeForm.map((income) => (
            <li key={income.id}>
              {income.description}: R$ {income.value} em {income.date.toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}