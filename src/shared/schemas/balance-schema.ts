import { z } from "zod";


export const balanceSchema = z.object({
    value: z.string().min(1, "Valor é obrigatório"),
    action: z.enum(["add", "subtract"]),
});

export type BalanceFormData = z.infer<typeof balanceSchema>;