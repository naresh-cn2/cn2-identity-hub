import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { getProjects, getCertifications, getServices } from '@/lib/content';
import fs from 'fs';
import path from 'path';

export default function LongTermIdentityHub() {
  const projects = getProjects();
  const certifications = getCertifications();
  const services = getServices();

  // Load Structured Ecosystem Mapping Matrix
  const ecosystemPath = path.join(process.cwd(), 'content', 'ecosystem.json');
  const ecosystem = fs.existsSync(ecosystemPath) ? JSON.parse(fs.readFileSync(ecosystemPath, 'utf8')) : {};

  return (
    <div className="w-full bg-[#070a13] text-gray-300 min-h-screen font-sans pb-20">
      <Navbar />
      <Hero />

      {/* STRATEGIC INTENT ROUTER FOR AUDIENCES */}
      <section className="py-12 px-6 max-w-4xl mx-auto border-t border-gray-900">
        <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase block mb-4">// INTENT_BASED_FAST_TRACKS</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-[11px] text-center">
          <a href="#projects" className="p-3 bg-[#0e1322] border border-gray-800 rounded hover:border-emerald-500/40 transition">I am a CTO (Proof)</a>
          <a href="#services" className="p-3 bg-[#0e1322] border border-gray-800 rounded hover:border-cyan-400/40 transition">I am a Client (Services)</a>
          <a href="#credentials" className="p-3 bg-[#0e1322] border border-gray-800 rounded hover:border-white/40 transition">I am a Recruiter (Verified)</a>
          <a href="#ecosystem" className="p-3 bg-[#0e1322] border border-gray-800 rounded hover:border-emerald-400/40 transition">Developer (Ecosystem)</a>
        </div>
      </section>

      {/* Projects Layer */}
      <section id="projects" className="py-16 px-6 max-w-4xl mx-auto border-t border-gray-900">
        <h2 className="font-mono text-xs text-emerald-400 tracking-widest uppercase font-bold mb-8">// SHIPPED_ASSETS_DATABASE</h2>
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Services Layer */}
      <section id="services" className="py-16 px-6 max-w-4xl mx-auto border-t border-gray-900">
        <h2 className="font-mono text-xs text-emerald-400 tracking-widest uppercase font-bold mb-8">// SOLUTIONS_STOREFRONT</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((s: any, idx: number) => (
            <div key={idx} className="p-5 bg-[#0f1423] border border-gray-800 rounded-lg flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-emerald-400 block mb-1">{s.tag}</span>
                <h4 className="text-sm font-bold text-white mb-2">{s.title}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed mb-4">{s.description}</p>
              </div>
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="w-full text-center py-2 bg-[#070a13] border border-gray-800 text-white font-mono text-[10px] rounded hover:border-emerald-500 transition">
                {s.actionText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Ecosystem Mapping Layer */}
      <section id="ecosystem" className="py-16 px-6 max-w-4xl mx-auto border-t border-gray-900">
        <h2 className="font-mono text-xs text-emerald-400 tracking-widest uppercase font-bold mb-8">// CN2_DIGITAL_ECOSYSTEM_MAP</h2>
        <div className="grid sm:grid-cols-2 gap-6 font-mono text-xs">
          {Object.entries(ecosystem).map(([category, items]: [string, any]) => (
            <div key={category} className="p-4 bg-[#0e1322] border border-gray-800 rounded-xl">
              <span className="text-cyan-400 block uppercase font-bold mb-3 tracking-wider text-[10px]">
                {category.replace('_', ' ')}
              </span>
              <ul className="space-y-2">
                {items.map((item: any, idx: number) => (
                  <li key={idx} className="flex justify-between items-center border-b border-gray-900 pb-1.5 last:border-0">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 hover:underline">
                      &gt; {item.name}
                    </a>
                    <span className="text-gray-500 text-[10px]">{item.metrics}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials Layer */}
      <section id="credentials" className="py-16 px-6 max-w-4xl mx-auto border-t border-gray-900">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h2 className="font-mono text-xs text-emerald-400 tracking-widest uppercase font-bold">// VERIFIED_CREDENTIALS</h2>
          </div>
          <div className="md:col-span-2">
            <ul className="space-y-3 text-xs font-mono text-gray-400">
              {certifications.map((c: any, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400">&bull;</span>
                  <span>{c.title} — <strong className="text-gray-300">{c.issuer}</strong></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}