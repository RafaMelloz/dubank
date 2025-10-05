import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/shared/libs/better-auth/auth-middleware";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * GET /api/expense
 * Lista todas as despesas do usuário autenticado
 */
export const GET = withAuth(async (request, { user }) => {

});

/**
 * POST /api/expense
 * Cria uma nova despesa para o usuário autenticado
 */
export const POST = withAuth(async (request, { user }) => {
 
});
