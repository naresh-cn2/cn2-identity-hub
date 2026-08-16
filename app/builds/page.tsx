import Link from 'next/link';

export default function BuildsPage() {
  return (
    <div className="w-full bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white pb-32">
      
      {/* Editorial Navigation */}
      <nav className="w-full z-50 bg-transparent relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <Link href="/" className="font-sans text-sm font-black text-black tracking-widest uppercase">
            BUKYA NARESH // BUILDS
          </Link>
          <div className="flex items-center">
            <Link href="/" className="font-mono text-[10px] md:text-xs font-bold text-black tracking-widest uppercase hover:text-[#cc0000] transition-colors">
              [ RETURN HOME ↗ ]
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
        
        {/* Header */}
        <div className="mb-32">
          <h1 className="font-sans font-black text-6xl md:text-8xl lg:text-[9rem] tracking-tighter text-black uppercase leading-none mb-12">
            BUILDS
          </h1>
          <div className="max-w-2xl border-l-4 border-[#cc0000] pl-6">
            <p className="font-medium text-lg md:text-xl text-black leading-relaxed">
              A structured record of platforms, products, and systems engineered as foundational technical infrastructure.
            </p>
          </div>
        </div>

        {/* Architectural Shell: PLATFORMS */}
        <section className="mb-32">
          <div className="border-b-2 border-black pb-4 mb-12">
            <h2 className="font-mono text-sm md:text-base font-bold tracking-widest text-black uppercase">
              // 01 — PLATFORMS
            </h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-300">
            <p className="font-mono text-xs md:text-sm text-gray-500 tracking-widest uppercase text-center">
              Platform architecture will be indexed here.
            </p>
          </div>
        </section>

      </main>

    </div>
  );
}
