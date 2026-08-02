import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useIntlayer, useLocale } from "react-intlayer";

type MenuItem = {
    label: string;
    href: string;
};

export default function Navbar() {
    const locale = useLocale();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none"
                    onClick={() =>
                        locale.setLocale(
                            locale.locale === "en" ? "pt-BR" : "en",
                        )
                    }
                >
                    <Languages />
                    {locale.locale === "en" ? (
                        <span className="text-xs">EN</span>
                    ) : (
                        <span className="text-xs">PT</span>
                    )}
                </Button>

                <Separator
                    orientation="vertical"
                    className={"bg-neutral-300 dark:bg-neutral-600 mr-2"}
                />

                <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-none"
                    onClick={() => toggleTheme()}
                >
                    {theme === "dark" ? (
                        <Sun className="stroke-yellow-400" />
                    ) : (
                        <Moon className="stroke-blue-400" />
                    )}
                </Button>
            </div>
        </nav>
    );
}
