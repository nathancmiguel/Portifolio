import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";

        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleThemeChange = (e: Event) => {
            const customEvent = e as CustomEvent<"light" | "dark">;
            setTheme(customEvent.detail);
        };

        window.addEventListener("theme-change", handleThemeChange);
        return () => window.removeEventListener("theme-change", handleThemeChange);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        window.dispatchEvent(new CustomEvent("theme-change", { detail: newTheme }));
    };

    return { theme, toggleTheme };
}
