export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="bg-[#0f1423] border border-gray-800/80 rounded-xl p-6 shadow-xl">
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div>
          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider block">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
        </div>
        <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded">
          {project.status}
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-4">{project.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 font-mono text-[10px]">
        <div className="p-2 bg-[#070a13] rounded border border-gray-800/60">
          <span className="text-gray-500 block">THROUGHPUT</span>
          <span className="text-white font-bold">{project.throughput}</span>
        </div>
        <div className="p-2 bg-[#070a13] rounded border border-gray-800/60">
          <span className="text-gray-500 block">VELOCITY</span>
          <span className="text-white font-bold">{project.velocity}</span>
        </div>
        <div className="p-2 bg-[#070a13] rounded border border-gray-800/60">
          <span className="text-gray-500 block">LATENCY</span>
          <span className="text-white font-bold">{project.latency}</span>
        </div>
        <div className="p-2 bg-[#070a13] rounded border border-gray-800/60">
          <span className="text-gray-500 block">HEAP CHURN</span>
          <span className="text-white font-bold">{project.heapAlloc}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 font-mono text-xs">
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">[Source Tree]</a>}
        {project.whitepaperUrl && <a href={project.whitepaperUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">[Whitepaper]</a>}
        {project.polarUrl && <a href={project.polarUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline">[Licensing]</a>}
      </div>
    </div>
  );
}