import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/shared/libs/better-auth/auth-middleware";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * GET /api/income
 * Lista todas as receitas do usuário autenticado
 */
export const GET = withAuth(async (request, { user }) => {
    const { searchParams } = new URL(request.url);
    const extra = searchParams.get("extra") === "true";

    try {
        const incomes = await prisma.income.findMany({
            select: {
                id: true,
                value: true,
                description: true,
                date: true,
            },
            where: { userId: user.id, extra: extra },
            orderBy: { date: "desc" },
        });
        return NextResponse.json(incomes, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao listar receitas" },
            { status: 500 }
        );
    }
});

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
        await prisma.income.create({
            data: {
                userId: user.id,
                value,
                description,
                date: new Date(date),
                extra,
            },
        });
        return NextResponse.json({ message: "Renda fixa adicionada com sucesso!" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao adicionar renda fixa. Tente novamente." }, { status: 500 });
    }

});


export const DELETE = withAuth(async (request, { user }) => {
    const body = await request.json();
    const { id } = body;
    try {
        await prisma.income.delete({
            where: { id, userId: user.id },
        });
        return NextResponse.json({ message: "Renda fixa removida com sucesso!" }, { status: 200 });
    } catch (error) {
        console.error("Erro ao remover renda fixa:", error);
        return NextResponse.json({ error: "Erro ao remover renda fixa" }, { status: 500 });
    }
})

