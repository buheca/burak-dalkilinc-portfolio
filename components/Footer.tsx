export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.05] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-zinc-600">
          &copy; {year} Burak Dalkılınç. Tüm hakları saklıdır.
        </p>
        <p className="text-xs text-zinc-700 font-mono">
          Next.js &middot; Tailwind CSS &middot; Framer Motion
        </p>
      </div>
    </footer>
  );
}
