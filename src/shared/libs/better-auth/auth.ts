import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    hooks:{
        after: createAuthMiddleware(async (ctx) => {
           if (ctx.path.startsWith("/sign-up")) {
            const newSession =  ctx.context.newSession
            if (newSession) {
                await prisma.balance.create({
                    data: {
                        userId: newSession.user.id,
                        value: 0,
                    },
                });
            }
        }})
    },
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
});