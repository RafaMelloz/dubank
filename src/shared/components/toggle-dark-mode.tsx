"use client"

import { LoaderCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"
import { use, useEffect, useState } from "react";

export function ToggleDarkMode() {
    const {resolvedTheme, setTheme} = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleToggle = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    }
    
    return (
        <div className="w-1/2 relative">
            <button onClick={handleToggle} className="btn w-full">
                {
                    !isMounted 
                        ? <LoaderCircle /> 
                        : (
                        isMounted && resolvedTheme === "light"
                            ? <Sun></Sun>
                            : <Moon></Moon>
                    )
                }
            </button>
        </div>
    )
}
