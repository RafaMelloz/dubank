"use client"

import { Diamond, Droplet, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLayoutMode } from "../hooks/useLayoutMode";

export function ToggleLayoutMode() {
    const {layoutMode, setLayoutMode} = useLayoutMode();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleToggle = () => {
        setLayoutMode(layoutMode === "solid" ? "liquid" : "solid");
    }

    return (
        <div className="w-1/2 relative">
            <button onClick={handleToggle} className="btn w-full">
                {
                    !isMounted 
                        ? <LoaderCircle /> 
                        : (
                        isMounted && layoutMode === "solid"
                            ? <Diamond />
                            : <Droplet />
                    )
                }
            </button>
        </div>
    )
}
