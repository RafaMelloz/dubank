import { auth } from "@/shared/libs/better-auth/auth";
import { ArrowDown, ArrowUp } from "lucide-react";
import { headers } from "next/headers";
import { getMonthlyMovements, getWalletSummary } from "@/shared/actions/actions";
import { Chart } from "@/shared/components/chart";

// Formata data como dd/m (BR) usando UTC para evitar mudar para o dia anterior por fuso horário
function formatDateBR(date: Date | string) {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.getUTCMonth() + 1; // sem zero à esquerda
  return `${day}/${month}`;
}

export default async function WalletPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { balance, totalIncome, totalExpense } = await getWalletSummary(session!.user.id);
  const movements = await getMonthlyMovements(session!.user.id, 4);

  return (
    <>

      {/* Card de saldo */}
      <div className="card">
        <h5 className="text-sm opacity-85">Saldo Atual</h5>
        <h2 className="font-extrabold text-3xl">R$ {balance.toFixed(2)}</h2>

        <div className="my-2 flex justify-between text-sm opacity-85">
          <span className="flex gap-2 items-center">
            <ArrowUp className="w-4 h-4 bg-blue-950 dark:bg-cyan-50 text-cyan-50 dark:text-blue-950 rounded-full" />
            Entradas do mês
          </span>

          <span>R$ {totalIncome.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm opacity-85">
          <span className="flex gap-2 items-center">
            <ArrowDown className="w-4 h-4 bg-blue-950 dark:bg-cyan-50 text-cyan-50 dark:text-blue-950 rounded-full" />
            Saídas do mês
          </span>

          <span>R$ {totalExpense.toFixed(2)}</span>
        </div>
      </div>

      {/* Card de movimentações */}
      <div className="card mt-4">
        <h2 className="mb-1 font-semibold text-xl">Últimas movimentações</h2>

        {movements.length === 0 ? (
          <p className="text-sm opacity-75">Nenhuma movimentação neste mês.</p>
        ) : (
          <ul>
            {movements.map((m) => (
              <li key={m.id} className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm opacity-70">{formatDateBR(m.date)}</p>
                  <p className="text-sm font-medium capitalize">{m.description}</p>
                </div>
                <div className={m.type === "income" ? "text-emerald-600 dark:text-emerald-400 text-sm" : "text-rose-600 dark:text-rose-400 text-sm"}>
                  {m.type === "income" ? "+" : "-"} R$ {m.value.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card mt-4">
        <h2 className="mb-1 font-semibold text-xl">Resumo dos meses</h2>

        <Chart />
      </div>
    </>
  );
}