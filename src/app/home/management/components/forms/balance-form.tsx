"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BalanceFormData, balanceSchema } from "@/shared/schemas/balance-schema";
import { api } from "@/shared/libs/axios/axios";

export default function BalanceForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BalanceFormData>({
    resolver: zodResolver(balanceSchema),
    defaultValues: {
      action: "add",
    },
  });

  const onSubmit = async (data: BalanceFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const numValue = parseFloat(data.value.replace(",", "."));
      if (isNaN(numValue) || numValue <= 0) {
        setError("Valor deve ser um número positivo");
        setIsLoading(false);
        return;
      }

      await api.patch("/api/balance", {
        value: data.action === "subtract" ? -numValue : numValue,
      });

      reset();
      router.push("/home/wallet");
      router.refresh();
    } catch (err) {
      setError("Erro ao atualizar saldo. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Saldo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="value" className="block text-sm font-medium mb-2">
            Valor
          </label>
          <input
            id="value"
            type="text"
            {...register("value")}
            placeholder="0,00"
            className="input"
          />
          {errors.value && (
            <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Ação
          </label>
          <div className="flex gap-4">
            <label className="radio-label flex">
              <input
                type="radio"
                value="add"
                {...register("action")}
                className="radio-input"
              />
              <span>Adicionar</span>
            </label>
            <label className="radio-label flex">
              <input
                type="radio"
                value="subtract"
                {...register("action")}
                className="radio-input"
              />
              <span>Subtrair</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn w-full"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
