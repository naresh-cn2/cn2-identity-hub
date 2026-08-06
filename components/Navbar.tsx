import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#070a13]/80 backdrop-blur-md border-b border-gray-900">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-xs tracking-widest font-bold text-white uppercase">
          BUKYA NARESH
        </Link>
        <div className="hidden md:flex items-center space-x-6 font-mono text-[11px] tracking-wider uppercase text-gray-400">
          <a href="#about" className="hover:text-emerald-400 transition">/about</a>
          <a href="#projects" className="hover:text-emerald-400 transition">/projects</a>
          <a href="#services" className="hover:text-emerald-400 transition">/services</a>
          <a href="#credentials" className="hover:text-emerald-400 transition">/credentials</a>
          <a href="https://contra.com/mrcn2" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 border border-emerald-500/40 text-emerald-400 font-semibold rounded text-[10px] transition hover:bg-emerald-500 hover:text-black">
            HIRE STUDIO
          </a>
        </div>
      </div>
    </nav>
  );
}