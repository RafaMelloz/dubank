import z from "zod";

export const login = z.object({
    email: z.string("Valor inválido")
        .min(1, "Campo obrigatório")
        .email("Email inválido"),
    password: z.string("Valor inválido")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
})
export type LoginSchema = z.infer<typeof login>; //tipagem do formulário

export const signup = z.object({
    name: z.string("Valor inválido")
        .min(1, "Campo obrigatório"),
    email: z.string("Valor inválido")
        .min(1, "Campo obrigatório")
        .email("Email inválido"),
    password: z.string("Valor inválido")
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
})
export type SignupSchema = z.infer<typeof signup>; //tipagem do formulário