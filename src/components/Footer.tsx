

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="max-[500px]:mb-20 border-t p-4">
            <div className="container font-medium text-[12px] text-neutral-600 dark:text-neutral-400">&copy; {currentYear} Nathan Miguel. All rights reserved.</div>
        </footer>
    );
}