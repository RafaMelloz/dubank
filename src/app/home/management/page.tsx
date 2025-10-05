import { Ban, BanknoteArrowDown, BanknoteArrowUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ManagementPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Renda</h2>
                <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-400/20"><BanknoteArrowUp className="text-green-500" /></span>
            </div>

            <Link href='' className="card flex cursor-pointer justify-between">
                Registro de saldo
                <ChevronRight />
            </Link>

            <Link href='' className="card flex cursor-pointer justify-between">
                Registrar renda fixa
                <ChevronRight />
            </Link>

            <Link href='' className="card flex cursor-pointer justify-between">
                Registrar renda extra
                <ChevronRight />
            </Link>

            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Despesas</h2>
                <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20"><BanknoteArrowDown className="text-red-500" /></span>
            </div>

            <Link href='' className="card flex cursor-pointer justify-between">
                Registrar despesas fixa
                <ChevronRight />
            </Link>

            <Link href='' className="card flex cursor-pointer justify-between">
                Registrar despesas extras
                <ChevronRight />
            </Link>
        </div>
    );
}
