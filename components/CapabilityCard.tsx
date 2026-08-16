export default function CapabilityCard({ cap }: { cap: any }) {
    return (
        <div className="bg-black border border-subtle rounded-2xl p-8 hover:border-gray-600 transition-colors duration-500">
            <div className="mb-6">
                <span className="font-mono text-xs text-muted tracking-widest uppercase block mb-3 border border-border px-3 py-1 rounded-full w-max">
                  Domain
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{cap.capability}</h3>
            </div>

            <p className="text-base text-gray-400 leading-relaxed mb-8">
                {cap.mission}
            </p>

            <div className="mb-8">
                <span className="font-mono text-xs text-muted uppercase tracking-widest block mb-4">Core Concepts</span>
                <ul className="space-y-3">
                    {cap.coreEngineeringConcepts.map((concept: string, idx: number) => (
                        <li key={idx} className="flex items-start text-sm font-sans text-gray-300">
                            <span className="text-white mr-3 mt-0.5 opacity-50">✦</span>
                            <span>{concept}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {cap.currentProofAssets && cap.currentProofAssets.length > 0 && (
                <div className="mb-8 pt-6 border-t border-subtle">
                    <span className="font-mono text-xs text-muted uppercase tracking-widest block mb-4">Proof Assets</span>
                    <div className="space-y-2">
                        {cap.currentProofAssets.map((asset: any, idx: number) => (
                            <div key={idx} className="flex flex-wrap justify-between items-center py-2 font-mono text-xs border-b border-border last:border-0">
                                <span className="text-white">{asset.name}</span>
                                <span className="text-gray-500">{asset.metrics}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="pt-6 border-t border-subtle">
                <div className="flex flex-wrap gap-2">
                    {cap.supportingTechnologies.map((tech: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-accent text-gray-300 font-mono text-xs rounded-full border border-border">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}