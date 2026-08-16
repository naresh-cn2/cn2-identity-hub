export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden flex items-center justify-center">
      
      {/* Editorial Grid Container */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 h-[80vh] relative z-10 mt-16">
        
        {/* LEFT: Vertical 'PORTFOLIO' Label */}
        <div className="hidden md:flex col-span-1 items-center justify-center h-full">
          <div 
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className="font-mono text-xs tracking-[0.4em] uppercase text-gray-400"
          >
            PORTFOLIO
          </div>
        </div>

        {/* CENTER-LEFT: Spacer to preserve image container position */}
        <div className="hidden md:flex col-span-3"></div>

        {/* RIGHT: Main Composition & Identity Block */}
        <div className="col-span-1 md:col-span-8 relative flex flex-col md:block items-center justify-end h-full w-full">
          
          {/* Portrait Composite Image (LOCKED) */}
          <div className="relative z-20 h-full w-full flex justify-end pointer-events-none flex-shrink-0">
            <img 
              src="/portrait.png" 
              alt="Bukya Naresh - AI-Native Systems Architect" 
              className="object-contain object-center md:object-right w-full h-full transform scale-[1.3] sm:scale-[1.4] md:scale-[1.8] lg:scale-[2.1] xl:scale-[2.3] origin-center md:origin-right"
            />
          </div>

          {/* PUBLIC IDENTITY EDITORIAL BLOCK */}
          <div className="relative md:absolute right-0 top-0 bottom-0 z-30 w-full md:w-[75%] lg:w-[65%] xl:w-[60%] flex flex-col justify-center pointer-events-auto mt-8 md:mt-0 px-2 md:px-0">
            
            <div className="flex flex-col gap-6 md:gap-8 justify-center overflow-y-auto md:overflow-visible pt-4 md:pt-0">
              
              {/* Header Hierarchy */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-lg md:text-xl font-bold tracking-widest text-[#cc0000] uppercase">
                  // ABOUT ME;
                </span>
                <h1 className="font-sans font-black text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-black uppercase mt-2">
                  BUKYA NARESH
                </h1>
                <h2 className="font-mono text-sm md:text-base font-semibold tracking-widest text-zinc-800 uppercase mt-2">
                  AI-Native Systems Architect
                </h2>
              </div>

              {/* Identity Manifesto */}
              <div className="flex flex-col gap-4 text-[13px] md:text-sm text-gray-800 leading-relaxed font-medium max-w-[480px] mt-2">
                <p>
                  I architect and build products, systems, platforms, and foundational software across systems engineering, enterprise data, AI, automation, quantitative intelligence, performance, and reliability.
                </p>
                <p>
                  I combine deep engineering with AI-native execution to expand the speed, depth, and scale at which complex systems can be designed, engineered, tested, and deployed.
                </p>
                <p>
                  My focus is building capabilities that operate across global industries—where infrastructure, intelligence, and deterministic execution become critical to how modern enterprises operate.
                </p>
              </div>

              {/* Master Axiom */}
              <div className="border-l-2 border-[#cc0000] pl-4 py-1 max-w-[480px] mt-6 pb-12 md:pb-0">
                <p className="font-serif text-[15px] md:text-[17px] italic font-medium text-zinc-900 leading-relaxed tracking-wide">
                  "Stability is architected.<br className="hidden md:block" />
                  Mastery is earned through consistency."
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}