export function formatDateBR(date: Date | string) {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = d.getUTCMonth() + 1; // sem zero à esquerda
    return `${day}/${month}`;
}