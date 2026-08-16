export default function ProcessSection() {
  const steps = [
    { id: "01", title: "PROBLEM", description: "Deep analysis of the technical constraint or business requirement." },
    { id: "02", title: "ARCHITECTURE", description: "Systems design, component mapping, and infrastructure planning." },
    { id: "03", title: "BUILD", description: "Implementation with focus on performance, scalability, and code quality." },
    { id: "04", title: "VERIFY", description: "Rigorous testing, benchmarking, and security validation." },
    { id: "05", title: "DOCUMENT", description: "Comprehensive architectural whitepapers and integration guides." },
    { id: "06", title: "SHIP", description: "Deployment to production or delivery of final engineering assets." },
    { id: "07", title: "VALIDATE", description: "Post-deployment monitoring and outcome verification." }
  ];

  return (
    <section id="process" className="py-24 px-6 max-w-5xl mx-auto border-t border-subtle">
      <h2 className="text-3xl font-bold text-white tracking-tight mb-16">Engineering Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col">
            <span className="font-mono text-xs text-muted mb-4">{step.id} —</span>
            <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
