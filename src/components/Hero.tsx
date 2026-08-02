import { Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useIntlayer } from "react-intlayer";

type ContactLink = {
    label: string;
    href: string;
    icon: ReactNode;
    description: string;
};

type AnotherContactLink = {
    href: string;
    icon: ReactNode;
};

export default function Hero() {
    const cardContent = useIntlayer("card");

    const contactLinks: ContactLink[] = [
        {
            label: "YouTube",
            href: "https://youtube.com",
            icon: <FaYoutube />,
            description: cardContent.youtube,
        },
        {
            label: "GitHub",
            href: "https://github.com",
            icon: <FaGithub />,
            description: cardContent.github,
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com",
            icon: <FaLinkedin />,
            description: cardContent.linkedin,
        },
    ];

    const anotherContactLinks: AnotherContactLink[] = [
        {
            href: "mailto:nathan.cm77@gmail.com",
            icon: <Mail />,
        },
        {
            href: "https://discord.gg/DBNATxA6Jx",
            icon: <FaDiscord />,
        },
        {
            href: "https://instagram.com/nathancmiguel",
            icon: <FaInstagram />,
        },
        {
            href: "https://twitter.com/nathancmiguel",
            icon: <FaTwitter />,
        },
    ];

    return (
        <header className="card-header">
            <Card className="card-hero">
                <CardHeader>
                    <CardTitle className="flex items-center justify-start gap-4">
                        <div className="flex items-center justify-center">
                            <img
                                src="/img/me.jpg"
                                alt="Profile Image"
                                className="w-14 h-14 rounded-full"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-xl max-[375px]:text-lg font-bold text-left">
                                Nathan Miguel
                            </h1>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {cardContent.developer}
                            </p>
                        </div>
                    </CardTitle>
                    <CardDescription className="flex flex-col py-2 items-start justify-center gap-2">
                        <div className="flex gap-x-2 items-center">
                            <MapPin className="w-4 h-4 stroke-yellow-500" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                {cardContent.location}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-justify">
                                {cardContent.description}
                            </p>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                    {contactLinks.map((link) => (
                        <Button
                            key={link.label}
                            variant="outline"
                            nativeButton={false}
                            className="w-full flex flex-col items-start justify-center px-4 py-8 max-[345px]:py-10 shadow-md"
                            render={
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="flex items-center justify-start gap-2">
                                        {link.icon}
                                        <span className="text-[16px] font-semibold text-neutral-900 dark:text-neutral-100">
                                            {link.label}
                                        </span>
                                    </div>
                                    <p className="text-[12px] font-normal text-neutral-600 dark:text-neutral-300 text-wrap text-left">
                                        {link.description}
                                    </p>
                                </a>
                            }
                        />
                    ))}
                </CardContent>
                <CardFooter className="flex gap-x-2">
                    {anotherContactLinks.map((link) => (
                        <Button
                            key={link.href}
                            variant="ghost"
                            nativeButton={false}
                            size={"icon-sm"}
                            render={
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon}
                                </a>
                            }
                        />
                    ))}
                </CardFooter>
            </Card>
        </header>
    );
}
