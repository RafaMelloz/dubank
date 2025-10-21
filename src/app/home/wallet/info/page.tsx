"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import type { MovementItem } from "@/shared/interfaces/movimentItem";
import { useSearchParams, useRouter } from "next/navigation";

// export default async function WalletInfoPage({ searchParams }: { searchParams: { month: string } }) 
export default function WalletInfoPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [movements, setMovements] = useState<MovementItem[]>([]);

    // Gera os últimos 3 meses (atual + 2 anteriores)
    const getLastThreeMonths = () => {
        const currentDate = new Date();
        const months = [];
        
        for (let i = 0; i < 3; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push({
                value: date.getMonth() + 1,
                label: date.toLocaleDateString('pt-BR', { month: 'long' })
            });
        }
        
        return months;
    };

    const availableMonths = getLastThreeMonths();

    useEffect(() => {
        const monthParam = searchParams.get('month');
        if (monthParam) {
            setSelectedMonth(parseInt(monthParam));
        } else {
            // Se não houver parâmetro, usa o mês atual
            const currentMonth = new Date().getMonth() + 1;
            setSelectedMonth(currentMonth);
            router.push(`/home/wallet/info?month=${currentMonth}`);
        }
    }, [searchParams, router]);

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
        router.push(`/home/wallet/info?month=${month}`);
    };

    // Busca detalhes quando o mês selecionado muda
    useEffect(() => {
        if (!selectedMonth) return;
        let ignore = false;
        const controller = new AbortController();
        const year = new Date().getFullYear();
        setLoading(true);
        setError(null);

        fetch(`/api/details?month=${selectedMonth}&year=${year}` , {
            method: 'GET',
            signal: controller.signal,
            credentials: 'include',
            headers: { 'Accept': 'application/json' },
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data?.error || 'Erro ao carregar detalhes');
                if (!ignore) setMovements(data.movements ?? []);
            })
            .catch((e) => { if (!ignore) setError(e.message); })
            .finally(() => { if (!ignore) setLoading(false); });

        return () => { ignore = true; controller.abort(); };
    }, [selectedMonth]);

    function formatDateBR(date: Date | string) {
        const d = new Date(date);
        const day = String(d.getUTCDate()).padStart(2, "0");
        const month = d.getUTCMonth() + 1; // sem zero à esquerda
        return `${day}/${month}`;
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4 gap-3">
                <Link href="/home/wallet" className="btn">
                    <ArrowLeft />
                </Link>

                <select 
                    value={selectedMonth} 
                    onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                    className="select w-fit capitalize"
                >
                    {availableMonths.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="card">
                {/* Lista de lançamentos ordenados por data */}
                <div className="">
                    {loading && <p className="text-sm text-gray-400">Carregando…</p>}

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    {!loading && !error && movements.length === 0 && (
                        <p className="text-sm text-gray-400">Nenhum lançamento neste mês.</p>
                    )}

                    {!loading && !error && movements.length > 0 && (
                        <ul className="space-y-3">
                            {movements.map((m) => {
                                const formatted = formatDateBR(m.date);
                                const isIncome = m.type === 'income';

                            return (
                                <li key={m.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm opacity-70 w-10">{formatted}</span>
                                        <span className="text-sm font-medium capitalize">{m.description}</span>
                                    </div>
                                    <div className={`font-semibold text-sm ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {isIncome ? '+' : '-'} R$ {Number(m.value).toFixed(2)}
                                    </div>
                                </li>
                            );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            
        </>
    );
}
