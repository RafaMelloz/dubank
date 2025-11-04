import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/shared/libs/better-auth/auth-middleware";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * GET /api/expense
 * Lista todas as despesas do usuário autenticado
 */
export const GET = withAuth(async (request, { user }) => {
    const { searchParams } = new URL(request.url);
    const extra = searchParams.get("extra") === "true";

    try {
        const expenses = await prisma.expense.findMany({
            select: {
                id: true,
                value: true,
                description: true,
                date: true
            },
            where: { userId: user.id, extra: extra },
            orderBy: { date: "desc" },
        });
        return NextResponse.json(expenses, { status: 200 });
    } catch (error) {
        console.error("Erro ao listar despesas:", error);
        return NextResponse.json(
            { error: "Erro ao listar despesas" },
            { status: 500 }
        );
    }

});

/**
 * POST /api/expense
 * Cria uma nova despesa para o usuário autenticado
 */
export const POST = withAuth(async (request, { user }) => {
    const body = await request.json();
    const { value, description, date, extra } = body;

    if (typeof value !== "number" || value <= 0) {
        return NextResponse.json({ error: "Valor deve ser um número positivo" }, { status: 400 });
    }

    if (typeof description !== "string" || description.trim() === "") {
        return NextResponse.json({ error: "Descrição é obrigatória" }, { status: 400 });
    }


    try {
        await prisma.expense.create({
            data: {
                userId: user.id,
                value,
                description,
                date: new Date(date),
                extra,
            },
        });
        return NextResponse.json({ message: "Despesa adicionada com sucesso!" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao adicionar despesa. Tente novamente." }, { status: 500 });
    }

});


export const DELETE = withAuth(async (request, { user }) => {
    const body = await request.json();
    const { id } = body;
    try {
        await prisma.expense.delete({
            where: { id, userId: user.id },
        });
        return NextResponse.json({ message: "Despesa removida com sucesso!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao remover despesa:", error);
        return NextResponse.json({ error: "Erro ao remover despesa" }, { status: 500 });
    }
})
