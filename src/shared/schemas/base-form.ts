import z from "zod";

export const baseFormSchema = z.object({
  value: z.string().min(1, "Valor é obrigatório"),
  description: z.string().min(3, "Descrição deve ter no mínimo 3 caracteres"),
  date: z.string().min(1, "Data é obrigatória"),
});

export type BaseFormData = z.infer<typeof baseFormSchema>;
