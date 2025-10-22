"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

type CustomTooltipPayloadItem = {
    color?: string;
    name?: string;
    dataKey?: string | number;
    value?: string | number;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: CustomTooltipPayloadItem[];
    label?: string | number;
};

export function Chart({data}: {data?: any[]}) {
    if (!data) {
        return (
            <div className="text-sm opacity-75">Nenhum dado disponível para exibir o gráfico.</div>
        );
    }
    return (
        <div style={{ width: '100%', maxWidth: '700px' }}>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="mes" tick={CustomTick} />
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Bar dataKey="renda" fill="#00d492" shape={RoundedBar} />
                    <Bar dataKey="despesas" fill="#ff637e" shape={RoundedBar} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function CustomTooltip({ active, payload = [], label }: CustomTooltipProps) {
    if (!active || payload.length === 0) return null;

    return (
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 shadow-md text-xs">
            <div className="mb-1 font-medium text-neutral-700 dark:text-neutral-200 opacity-85">{label}</div>
            <ul className="space-y-1">
                {payload.map((item, idx) => (
                    <li key={(item.dataKey as string) ?? idx} className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                            <span
                                className="h-2 w-2 rounded-sm"
                                style={{ background: (item.color as string) || '#8884d8' }}
                            />
                            <span className="opacity-85">{(item.name as string) ?? (item.dataKey as string)}</span>
                        </span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-100">{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function RoundedBar(props: any) {
    const { x, y, width, height, fill } = props;
    const radius = Math.min(width / 2, 6); // máximo 6px de raio, nunca maior que metade da largura
    // Path SVG para arredondar só o topo
    const right = x + width;
    const bottom = y + height;
    return (
        <path
            d={`M${x},${bottom} L${x},${y + radius} Q${x},${y} ${x + radius},${y} L${right - radius},${y} Q${right},${y} ${right},${y + radius} L${right},${bottom} Z`}
            fill={fill}
        />
    );
}

function CustomTick(props: any) {
    const { x, y, payload } = props;
    let fill = '#1a202c'; // neutral-800
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        fill = '#f3f4f6'; // neutral-100
    }
    return (
        <text
            x={x}
            y={y + 16}
            textAnchor="middle"
            fontSize="12"
            fontWeight="500"
            fill={fill}
        >
            {payload.value}
        </text>
    );
}

