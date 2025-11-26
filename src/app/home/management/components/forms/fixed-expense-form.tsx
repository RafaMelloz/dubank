"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { api } from "@/shared/libs/axios/axios";
import { useRouter } from "next/navigation";
import { BaseFormData, baseFormSchema } from "@/shared/schemas/base-form";
import { Expense } from "@/shared/interfaces/expense";
import { useSession } from "@/shared/libs/better-auth/auth-client";
import { Loader2, Trash } from "lucide-react";
import { formatDateBR } from "@/shared/helpers/date";
import { success } from "zod";
import { confirmToast, errorToast, loadingAlert, successToast } from "@/shared/libs/react-hot-toast/react-hot-toast";

export default function FixedExpenseForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BaseFormData>({
    resolver: zodResolver(baseFormSchema),
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchExpenses();
    }
  }, [session?.user?.id]);

  const onSubmit = async (data: BaseFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const numValue = parseFloat(data.value.replace(",", "."));
      if (isNaN(numValue) || numValue <= 0) {
        setError("Valor deve ser um número positivo");
        setIsLoading(false);
        return;
      }

      await api.post("/api/expense", {
        value: numValue,
        description: data.description,
        date: new Date(data.date).toISOString(),
        extra: false, // Despesa fixa
      });

      successToast("Registro adicionada com sucesso!");
      reset();
      router.push("/home/management");
      router.refresh();
    } catch (err) {
      setError("Erro ao adicionar despesa fixa. Tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExpenses = async () => {
    if (!session?.user?.id) return;
    setIsLoadingExpenses(true);
    try {
      const response = await api.get("/api/expense");
      setExpenses(response.data || []);
      setIsLoadingExpenses(false);
    } catch (error) {
      errorToast("Erro ao recuperar registros");
    } finally {
      setIsLoadingExpenses(false);
    }
  };

  const deleteExpense = async (id: string) => {
    if (!session?.user?.id) return;

    confirmToast("Deseja realmente excluir?", async () => {
      const promise = api.delete("/api/expense", { data: { id } });
      loadingAlert("Excluindo registro...", "Registro excluído com sucesso!", "Erro ao excluir registro", promise);
      promise.then((response) => {
        if (response.status === 200) {
          fetchExpenses();
        }
      })
    });
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-6">Adicionar Despesa Fixa</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Descrição
            </label>
            <input
              id="description"
              type="text"
              {...register("description")}
              placeholder="Ex: Aluguel, Internet, Água..."
              className="input"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>  

          <div className="w-full">
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
        </div>

        <div className="w-full">
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Data
          </label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className="input"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {expenses.length > 0 && !isLoadingExpenses && (
          <div className="card flex flex-col gap-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm opacity-70">
                    {formatDateBR(expense.date)}
                  </p>

                  <p className="font-medium">
                    {expense.description}
                    <span className="text-sm text-green-500"> - R$ {expense.value.toFixed(2).replace(".", ",")}</span>
                  </p>

                </div>
                <button
                  type="button"
                  onClick={() => deleteExpense(expense.id)}
                  className="btn"
                >
                  <Trash className="h-4 w-4 text-red-600 hover:text-red-700" />
                </button>
              </div>
            ))}
          </div>
        )}

        {isLoadingExpenses && (
          <Loader2 className="m-auto h-16 w-16 animate-spin text-cyan-500 mb-6" />
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
