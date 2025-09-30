"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"       // importante para gerar a classe no <html>
            defaultTheme="system"    // tema inicial
            enableSystem    // desabilita tema do sistema se quiser
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
