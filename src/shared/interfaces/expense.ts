export interface Expense {
    id: string;
    userId: string;
    value: number;
    description: string;
    date: Date;
    extra: boolean;
}