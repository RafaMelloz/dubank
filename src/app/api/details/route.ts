import { withAuth } from "@/shared/libs/better-auth/auth-middleware";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = withAuth(async (request, { user }) => {
    // GET não possui body. Leia os parâmetros da URL (?month=10&year=2025)
    const searchParams = request.nextUrl.searchParams;
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    const month = monthParam ? Number(monthParam) : NaN;
    const year = yearParam ? Number(yearParam) : new Date().getFullYear();

    if (!Number.isInteger(month) || month < 1 || month > 12) {
        return NextResponse.json({ error: "Mês inválido" }, { status: 400 });
    }

    try {
        // Garantir UTC 00:00:00.000 no início e 23:59:59.999 no fim
        const start = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
        const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

        const [incomes, expenses] = await Promise.all([
            prisma.income.findMany({
                where: {
                    userId: user.id,
                    date: { gte: start, lte: end },
                },
                orderBy: { date: "asc" },
            }),
            prisma.expense.findMany({
                where: {
                    userId: user.id,
                    date: { gte: start, lte: end },
                },
                orderBy: { date: "asc" },
            }),
        ]);

        // Mapeia para um array unificado de movimentos e ordena por data (mais recente primeiro)
        const movements = [
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
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({ month, year, period: { start, end }, movements });
    } catch (error) {
        console.error("/api/details GET error", error);
        return NextResponse.json({ error: "Erro ao buscar detalhes" }, { status: 500 });
    }
});