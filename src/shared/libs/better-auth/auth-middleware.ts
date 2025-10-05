import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware para verificar autenticação em rotas da API
 * Retorna o usuário autenticado ou erro 401
 */
export async function requireAuth(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        return {
            user: null,
            error: NextResponse.json(
                { error: "Não autorizado. Faça login para acessar este recurso." },
                { status: 401 }
            ),
        };
    }

    return {
        user: session.user,
        session: session.session,
        error: null,
    };
}

/**
 * Wrapper para rotas autenticadas - simplifica o código
 */
export function withAuth<T>(
    handler: (
        request: NextRequest,
        context: { user: typeof auth.$Infer.Session.user; session: typeof auth.$Infer.Session.session }
    ) => Promise<T>
) {
    return async (request: NextRequest) => {
        const { user, session, error } = await requireAuth(request);

        if (error) {
            return error;
        }

        return handler(request, { user: user!, session: session! });
    };
}
