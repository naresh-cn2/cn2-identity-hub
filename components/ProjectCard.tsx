export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group border border-subtle bg-black hover:border-muted transition-colors duration-500 rounded-2xl overflow-hidden p-8 flex flex-col justify-between">
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <span className="font-mono text-xs text-muted uppercase tracking-widest border border-border px-3 py-1 rounded-full">
            {project.category}
          </span>
          <span className="font-mono text-xs text-white uppercase tracking-widest">
            {project.status}
          </span>
        </div>
        <h3 className="text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-gray-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-base text-gray-400 leading-relaxed text-balance">
          {project.description}
        </p>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pt-8 border-t border-subtle font-mono text-xs">
          <div>
            <span className="text-muted block mb-1">THROUGHPUT</span>
            <span className="text-white font-medium">{project.throughput}</span>
          </div>
          <div>
            <span className="text-muted block mb-1">VELOCITY</span>
            <span className="text-white font-medium">{project.velocity}</span>
          </div>
          <div>
            <span className="text-muted block mb-1">LATENCY</span>
            <span className="text-white font-medium">{project.latency}</span>
          </div>
          <div>
            <span className="text-muted block mb-1">HEAP CHURN</span>
            <span className="text-white font-medium">{project.heapAlloc || "Zero Alloc"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 font-mono text-xs tracking-wider">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white"></span> Source
            </a>
          )}
          {project.whitepaperUrl && (
            <a href={project.whitepaperUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span> Documentation
            </a>
          )}
        </div>
      </div>
    </div>
  );
}