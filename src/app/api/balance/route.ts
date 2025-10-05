import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/shared/libs/better-auth/auth-middleware";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * GET /api/balance
 * Retorna o saldo do usuário autenticado
 */
export const GET = withAuth(async (request, { user }) => {
    try {
        const balance = await prisma.balance.findUnique({
            where: { userId: user.id },
        });

        if (!balance) {
            return NextResponse.json(
                { error: "Saldo não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: 200,
            data: balance,
        });
    } catch (error) {
        console.error("Erro ao buscar saldo:", error);
        return NextResponse.json(
            { error: "Erro ao buscar saldo" },
            { status: 500 }
        );
    }
});

/**
 * PATCH /api/balance
 * Atualiza o valor do saldo do usuário
 */
export const PATCH = withAuth(async (request, { user }) => {
    try {
        const body = await request.json();
        const { value } = body;

        if (typeof value !== "number") {
            return NextResponse.json(
                { error: "Valor inválido" },
                { status: 400 }
            );
        }

        const balance = await prisma.balance.update({
            where: { userId: user.id },
            data: { value },
        });

        return NextResponse.json({
            status: 200,
            data: balance,
            message: "Saldo atualizado com sucesso",
        });
    } catch (error) {
        console.error("Erro ao atualizar saldo:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar saldo" },
            { status: 500 }
        );
    }
});
