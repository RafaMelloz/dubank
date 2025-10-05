import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/shared/libs/better-auth/auth-middleware";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * GET /api/income
 * Lista todas as receitas do usuário autenticado
 */
export const GET = withAuth(async (request, { user }) => {
   
});

export const POST = withAuth(async (request, { user }) => {
    
});
