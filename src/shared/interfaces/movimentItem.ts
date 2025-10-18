export type MovementItem = {
  id: string;
  type: "income" | "expense";
  value: number;
  description: string;
  date: Date;
  extra: boolean;
};