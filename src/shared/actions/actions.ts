"use server";

import { auth } from "@/shared/libs/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { PrismaClient } from "@/generated/prisma";
import { MovementItem } from "../interfaces/movimentItem";

const prisma = new PrismaClient();

export async function getWalletSummary(userId: string) {
  // Pegar o primeiro e último dia do mês atual
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  // Buscar o balance do usuário
  const balance = await prisma.balance.findUnique({
    where: { userId },
  });

  // Somar todas as receitas fixas (independente do mês)
  const fixedIncomeSum = await prisma.income.aggregate({
    where: {
      userId,
      extra: false,
    },
    _sum: {
      value: true,
    },
  });

  // Somar receitas extras do mês atual
  const extraIncomeSum = await prisma.income.aggregate({
    where: {
      userId,
      extra: true,
      date: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth,
      },
    },
    _sum: {
      value: true,
    },
  });

  // Somar todas as despesas fixas (independente do mês)
  const fixedExpenseSum = await prisma.expense.aggregate({
    where: {
      userId,
      extra: false,
    },
    _sum: {
      value: true,
    },
  });

  // Somar despesas extras do mês atual
  const extraExpenseSum = await prisma.expense.aggregate({
    where: {
      userId,
      extra: true,
      date: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth,
      },
    },
    _sum: {
      value: true,
    },
  });

  // Calcular totais
  const totalIncome = (fixedIncomeSum._sum.value || 0) + (extraIncomeSum._sum.value || 0);
  const totalExpense = (fixedExpenseSum._sum.value || 0) + (extraExpenseSum._sum.value || 0);

  return {
    balance: balance?.value || 0,
    totalIncome,
    totalExpense,
  };
}

export async function getMonthlyMovements(userId: string, limit = 10): Promise<MovementItem[]> {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const [incomes, expenses] = await Promise.all([
    prisma.income.findMany({
      where: {
        userId,
        date: { gte: firstDayOfMonth, lte: lastDayOfMonth },
      },
      orderBy: { date: "desc" },
      take: limit,
    }),
    prisma.expense.findMany({
      where: {
        userId,
        date: { gte: firstDayOfMonth, lte: lastDayOfMonth },
      },
      orderBy: { date: "desc" },
      take: limit,
    }),
  ]);

  const mapped: MovementItem[] = [
    ...incomes.map((i) => ({
      id: i.id,
      type: "income" as const,
      value: i.value,
      description: i.description,
      date: i.date,
      extra: i.extra,
    })),
    ...expenses.map((e) => ({
      id: e.id,
      type: "expense" as const,
      value: e.value,
      description: e.description,
      date: e.date,
      extra: e.extra,
    })),
  ];

  // Ordenar por data desc e limitar ao total requerido (pode passar de 2*limit)
  return mapped
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    if (response?.user) {
      redirect("/home/wallet");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    // Silenciosamente falha e recarrega a página
    // Em produção, você pode adicionar query params para mostrar erro
  }
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    if (response?.user) {
      redirect("/home/wallet");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    // Silenciosamente falha e recarrega a página
    // Em produção, você pode adicionar query params para mostrar erro
  }
}
