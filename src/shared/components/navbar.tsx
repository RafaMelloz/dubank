"use client";

import { CircleUser, Plus, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarRoute = "wallet" | "management" | "account";

export function Navbar() {
    const pathname = usePathname() as string;
    const currentRoute = pathname.split("/").pop() as NavbarRoute;

    return (
        <nav className="navbar">
            <Link href="/home/wallet" className={`${currentRoute === "wallet" ? "active" : ""} nav-icon`}>
                <Wallet />
            </Link>
            <Link href="/home/management" className={`${currentRoute === "management" ? "active" : ""} nav-icon`}>
                <Plus />
            </Link>
            <Link href="/home/account" className={`${currentRoute === "account" ? "active" : ""} nav-icon`}>
                <CircleUser />
            </Link>
        </nav>
    );
}