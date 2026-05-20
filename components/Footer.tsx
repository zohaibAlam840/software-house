export function Footer() {
    return (
        <footer className="w-full px-6 py-12 md:px-20 bg-black text-zinc-600 text-xs font-medium uppercase tracking-widest border-t border-zinc-900 flex flex-col sm:flex-row justify-between gap-4">
            <span>© 2026 GiantsOfTech</span>
            <div className="flex gap-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
        </footer>
    );
}
