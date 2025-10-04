"use client"

import { signOut } from "@/shared/libs/better-auth/auth-client"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function BtnLogout() {
    const router = useRouter()

    const handleLogout = () => {
        signOut()
        router.push("/")
    }

   return <button className="btn" onClick={handleLogout}>
            <LogOut />
          </button>
}