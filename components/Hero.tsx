export default function Hero() {
  return (
    <section className="pt-36 pb-16 px-6 max-w-4xl mx-auto min-h-[65vh] flex flex-col justify-center">
      <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">
        // BARE-METAL INFRASTRUCTURE & DATA SYSTEMS
      </span>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
        Bukya Naresh <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Systems & Infrastructure Architect
        </span>
      </h1>
      <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
        Founder, <strong>CN2 Systems Co.</strong> Building C11 computational utilities, zero-copy POSIX memory ingestion planes, and fixed-point financial ledgers that eliminate structural enterprise processing friction.
      </p>
      <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider">
        <a href="#projects" className="px-4 py-3 bg-emerald-500 text-black font-bold rounded hover:bg-emerald-400 transition">
          Explore Shipped Assets
        </a>
        <a href="https://github.com/naresh-cn2" target="_blank" rel="noopener noreferrer" className="px-4 py-3 bg-gray-950 border border-gray-800 text-white rounded hover:border-gray-700 transition">
          Open Laboratory (GitHub)
        </a>
      </div>
    </section>
  );
}