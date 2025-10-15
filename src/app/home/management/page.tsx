import { Ban, BanknoteArrowDown, BanknoteArrowUp, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import BalanceForm from "../../../shared/components/forms/balance-form";
import FixedIncomeForm from "../../../shared/components/forms/fixed-income-form";
import ExtraIncomeForm from "../../../shared/components/forms/extra-income-form";
import FixedExpenseForm from "../../../shared/components/forms/fixed-expense-form";
import ExtraExpenseForm from "../../../shared/components/forms/extra-expense-form";

type FormType = "balance" | "fixed-income" | "extra-income" | "fixed-expense" | "extra-expense";

const formComponents: Record<FormType, React.ComponentType> = {
  "balance": BalanceForm,
  "fixed-income": FixedIncomeForm,
  "extra-income": ExtraIncomeForm,
  "fixed-expense": FixedExpenseForm,
  "extra-expense": ExtraExpenseForm,
};

interface ManagementPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ManagementPage({ searchParams }: ManagementPageProps) {
    const params = await searchParams;
    const formType = params.type as FormType;

    // Se houver um tipo de formulário, mostrar o formulário
    if (formType) {
        const FormComponent = formComponents[formType];

        if (!FormComponent) {
            return (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Formulário não encontrado</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            O tipo de formulário &quot;{formType}&quot; não existe.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                            Tipos disponíveis: balance, fixed-income, extra-income, fixed-expense, extra-expense
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="container mx-auto max-w-2xl">
                <Suspense fallback={<div>Carregando...</div>}>
                    <FormComponent />
                </Suspense>
            </div>
        );
    }

    // Se não houver tipo, mostrar a lista de links
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Renda</h2>
                <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-400/20"><BanknoteArrowUp className="text-green-500" /></span>
            </div>

            <Link href='/home/management?type=balance' className="card flex cursor-pointer justify-between">
                Registro de saldo
                <ChevronRight />
            </Link>

            <Link href='/home/management?type=fixed-income' className="card flex cursor-pointer justify-between">
                Registrar renda fixa
                <ChevronRight />
            </Link>

            <Link href='/home/management?type=extra-income' className="card flex cursor-pointer justify-between">
                Registrar renda extra
                <ChevronRight />
            </Link>

            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Despesas</h2>
                <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20"><BanknoteArrowDown className="text-red-500" /></span>
            </div>

            <Link href='/home/management?type=fixed-expense' className="card flex cursor-pointer justify-between">
                Registrar despesas fixa
                <ChevronRight />
            </Link>

            <Link href='/home/management?type=extra-expense' className="card flex cursor-pointer justify-between">
                Registrar despesas extras
                <ChevronRight />
            </Link>
        </div>
    );
}
