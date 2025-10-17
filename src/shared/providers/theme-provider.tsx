"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ProgressProvider } from "@bprogress/next/app"

export function Providers({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    
    return (
        <ProgressProvider
            height="4px"
            color={`#0284c7`}
            options={{ showSpinner: false }}
            shallowRouting
            >
            <NextThemesProvider
                attribute="class"       // importante para gerar a classe no <html>
                defaultTheme="system"    // tema inicial
                enableSystem    // desabilita tema do sistema se quiser
                {...props}
            >
                {children}
            </NextThemesProvider>
        </ProgressProvider>
    )
}
