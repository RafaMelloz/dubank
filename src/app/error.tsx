'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-dvh w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0Z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Algo deu errado</h1>
              <p className="text-sm opacity-70 leading-relaxed">
                O sistema encontrou um erro inesperado
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/home/wallet" className="btn w-full text-center">
              Ir para Dashboard
            </Link>
            <button
              onClick={() => setShowDetails(d => !d)}
              className=" w-full !py-1 text-xs font-normal"
              type="button"
            >
              {showDetails ? 'Ocultar detalhes técnicos' : 'Mostrar detalhes técnicos'}
            </button>
            {showDetails && (
              <div className="card p-3 text-xs font-mono whitespace-pre-wrap max-h-48 overflow-auto">
                {error.message}
                {error.digest && `\n\nDigest: ${error.digest}`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}