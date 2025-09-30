"use client"

import { useEffect, useState } from "react"

export function useLayoutMode() {
    const [layoutMode, setLayoutMode] = useState<"solid" | "liquid">("liquid")

    useEffect(() => {
        const html = document.documentElement

        // Remove qualquer layout antigo
        html.classList.remove("solid", "liquid")

        // Adiciona o layout atual
        html.classList.add(layoutMode)
    }, [layoutMode])

    return { layoutMode, setLayoutMode }
}
