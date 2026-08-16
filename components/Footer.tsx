export default function Footer() {
  return (
    <footer className="py-16 border-t border-subtle bg-black text-center font-sans">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-left">
          <div className="text-xl font-bold text-white tracking-tight mb-2">BUKYA NARESH</div>
          <div className="text-sm text-muted">AI-Native Systems Architect</div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 font-medium">
          <a href="https://github.com/naresh-cn2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/bukya-naresh-cn2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://contra.com/mrcn2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contra</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-12 text-left">
         <p className="text-xs text-gray-600 font-mono">&copy; {new Date().getFullYear()} Bukya Naresh. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
