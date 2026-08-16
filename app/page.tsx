import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import CapabilityCard from '@/components/CapabilityCard';
import ProcessSection from '@/components/ProcessSection';
import Footer from '@/components/Footer';
import { getProjects, getCertifications, getServices } from '@/lib/content';
import fs from 'fs';
import path from 'path';

export default function EngineeringPortfolio() {
  const projects = getProjects();
  const certifications = getCertifications();
  const services = getServices();

  const capPath = path.join(process.cwd(), 'content', 'capabilities.json');
  const capabilities = fs.existsSync(capPath) ? JSON.parse(fs.readFileSync(capPath, 'utf8')) : [];

  const ecoPath = path.join(process.cwd(), 'content', 'ecosystem.json');
  const ecosystem = fs.existsSync(ecoPath) ? JSON.parse(fs.readFileSync(ecoPath, 'utf8')) : {};

  return (
    <div className="w-full bg-black text-gray-300 min-h-screen font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <main>
        <Hero />

        {/* SELECTED ENGINEERING WORK */}
        <section id="projects" className="py-24 px-6 max-w-5xl mx-auto border-t border-subtle">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Selected Work</h2>
            <p className="text-lg text-gray-400 font-light max-w-2xl text-balance">
              Engineered systems built to handle massive scale, eliminate bottlenecks, and structure complex data natively.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* CAPABILITIES MATRIX */}
        <section id="capabilities" className="py-24 px-6 max-w-5xl mx-auto border-t border-subtle">
           <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Capabilities</h2>
            <p className="text-lg text-gray-400 font-light max-w-2xl text-balance">
              Deep expertise in building robust digital infrastructure and enterprise-grade architecture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap: any) => (
              <CapabilityCard key={cap.id} cap={cap} />
            ))}
          </div>
        </section>

        {/* ENGINEERING PROCESS */}
        <ProcessSection />

        {/* SERVICES / ENGAGEMENT */}
        <section id="services" className="py-24 px-6 max-w-5xl mx-auto border-t border-subtle">
           <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Services & Retainers</h2>
            <p className="text-lg text-gray-400 font-light max-w-2xl text-balance">
              Available for technical strategy, architecture consulting, and high-value system engineering engagements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s: any, idx: number) => (
              <div key={idx} className="p-8 bg-black border border-subtle rounded-2xl flex flex-col justify-between hover:border-gray-600 transition-colors duration-500">
                <div>
                  <span className="font-mono text-xs text-muted block mb-3">{s.tag}</span>
                  <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{s.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-8">{s.description}</p>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors rounded-lg">
                  {s.actionText}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* DIGITAL ECOSYSTEM */}
        <section id="ecosystem" className="py-24 px-6 max-w-5xl mx-auto border-t border-subtle">
           <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Digital Ecosystem</h2>
            <p className="text-lg text-gray-400 font-light max-w-2xl text-balance">
              The external platforms and professional networks where I operate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {Object.entries(ecosystem).map(([category, items]: [string, any]) => (
              <div key={category} className="p-8 bg-accent border border-subtle rounded-2xl">
                <span className="text-muted block uppercase tracking-widest text-xs font-mono mb-6">
                  {category.replace('_', ' ')}
                </span>
                <ul className="space-y-4">
                  {items.map((item: any, idx: number) => (
                    <li key={idx} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-gray-400 transition-colors text-base">
                        {item.name}
                      </a>
                      <span className="text-gray-500 text-sm font-mono">{item.metrics}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}